module.exports = function addAmmountToData(key, value, dataSet) {
  if (!dataSet[key]) dataSet[key] = { total: 0 }
  dataSet[key].total += value
  return dataSet
}
