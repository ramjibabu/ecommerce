class apiFuters{
constructor(query,queryString){
    this.query=query
    this.queryString=queryString
}
search(){
    const keyword=this.queryString.keyword?{
        name:{
            $regex:this.queryString.keyword,
            $options:"i"
        }
        
    }:{}
    
      this.query.find({...keyword})
    return this
}

fillter(){
   
    const queryStringCopy={...this.queryString}
    const removeFeilds=['keyword','limit','page']
    
    removeFeilds.forEach(feild => delete queryStringCopy[feild])
    let queryStr=JSON.stringify(queryStringCopy)
    queryStr=queryStr.replace(/\b(gt|gte|lt|lte)/g,item => `$${item}`)
    
    this.query.find(JSON.parse(queryStr))


    return this
}

pagenate(resultPerPage){
const currentPage=Number(this.queryString.page) || 1
const skip=resultPerPage*currentPage-1
this.query.find().limit(resultPerPage).skip(skip)

    return this
}

}

module.exports=apiFuters