const ApplayforMentor =()=>{

    return(
        <section>

            <h1 className="text-2xl text-center my-10 ">
                Applay For Become A DevDive Mentor
            </h1>

            <form action="">

            <div className="mb-6 relative">
  <input
    type="text"
    accept="image/*"
    id="bannerImageInput"
   name="name"
    className="hidden"
  />
  
  <label
    htmlFor="bannerImageInput"
    className="flex items-center justify-center gap-x-2 w-full px-4  py-3 text-sm text-gray-900 bg-transparent border-b-2 border-gray-300 rounded-md cursor-pointer focus:outline-none focus:ring-0 focus:border-blue-500 transition-all duration-300 peer"
  >
    <span className="material-icons text-blue-500 mr-2 text-2xl"></span>
  
  </label>


  <label
    className={`absolute left-4 top-0 transform transition-all duration-300`}
    
  >
    Banner Image
  </label>
</div>

            </form>
        </section>
    )
}
export default ApplayforMentor