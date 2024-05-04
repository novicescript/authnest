let dbType;
let dbConfig;

export function setDataBaseConfig(type, config) {
  dbType = type;
  dbConfig = config;
}

export function getDatabaseType() {
  return dbType;
}

export function getDatabaesConfig() {
  return dbConfig;
}
