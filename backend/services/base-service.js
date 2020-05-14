module.exports = class Service {
  async findAll() {
    return this.model.find()
  }

  async add(item) {
    return this.model.create(item)
  }

  async del(itemId) {
    return this.model.deleteOne({ _id: itemId })
  }

  async find(itemId, func) {
    return this.model.findById(itemId, func)
  }

  async findOne(json){
    return this.model.findOne(json)
  }

  async findFilter(json){
    return this.model.find(json)
  }

  async updateOne(searchArray, replaceJson){
    return this.model.updateOne(searchArray, replaceJson).findOne(searchArray)
  }


}
