const addTranslation = (db, key, lang, translation, callback) => {
    sql = 'INSERT INTO translations SET transKey=?, lang=?, trans=? ON DUPLICATE KEY UPDATE trans=?'
    db.query(sql, [key, lang, translation, translation], callback)
}

const getTranslation = (db, key, lang, callback) => {
    sql = 'SELECT trans FROM translations WHERE transKey = ? AND lang = ?'
    db.query(sql, [key, lang], callback)
}

module.exports = {addTranslation, getTranslation}