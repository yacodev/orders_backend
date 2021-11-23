module.exports = {
  api:{
    port: process.env.PORT || 3000,
  },
  jwt:{
    secret:process.env.JWT_SECRET||'notesecret',
  },
  mysql:{
    host: process.env.MYSQL_HOST||'remotemysql.com',
    user: process.env.MYSQL_USER||'sSMJ7EQyRn',
    password: process.env.MYSQL_PASSWORD||'wJvKZtOPXD',
    database: process.env.MYSQL_DATABASE||'sSMJ7EQyRn',
  },
  session_data:{
    secret: "987f4bd6d4315c20b2ec70a46ae846d19d0ce563450c02c5b1bc71d5d580060b",
  }
}