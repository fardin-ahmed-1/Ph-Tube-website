const apidata = async () => {
    const url = 'https://openapi.programming-hero.com/api/news/categories'
    const response = await fetch(url)
    const data = await response.json()
    const category = data.data.news_category.slice(1,)
    
    const categorieContainer = document.getElementById('category_container')

    category.forEach(category => {
        const createDiv = document.createElement('div');

        createDiv.innerHTML = `
    <a onclick='categoryInfo("${category.category_id}")' class="tab text-2xl hover:text-red-400 p-4"> ${category.category_name}</a> `
        categorieContainer.appendChild(createDiv)

    });
}
const categoryInfo = async (categoryId) => {
    const response = await fetch(`https://openapi.programming-hero.com/api/news/category/${categoryId}`)
    const data = await response.json()
    const contentInfo = data.data
    const postContainer = document.getElementById('post_container')
    postContainer.innerHTML = ''
    contentInfo.forEach(content => {
        const divCreat = document.createElement('div')
        // divCreat.classList="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4 mt-6"
        divCreat.innerHTML = `
        <div class="bg-[#FAFAFA] rounded-lg hover:shadow-md">
                <div>
                    <img class="rounded-t-lg" width='100%' height='50%' src=" ${content.thumbnail_url} " alt="">
                </div>
                <!-- contain items -->
                <div class="p-5 mt-3">
                    <span class="py-2 px-5 rounded-[4px] text-white bg-[#6227DA] text-base font-normal"> ${content.rating.badge} </span>

                    <h1 class="text-[#201654] hover:text-[#097BED] text-lg font-medium my-4">
                        ${content?.title.slice(0, 60)}
                    </h1>
                    <p class="text-[#201654] text-base font-normal text-left"> ${content.details.slice(0, 120)} </p>
                    <hr class="border border-gray-300 w-full my-5">
                    <!-- post info -->
                    <div class="flex items-center">
                        <span><img class="w-12 h-12 rounded-full" src="${content.author.img}" alt=""></span>
                        <span >
                            <p class="text-[#201654] hover:text-[#5454FF] text-base font-normal ml-2 hover:underline" onclick="modelClick('${content._id }'), showMoreInfoModal.showModal()">${content.author.name} </p>
                            
                        </span>

                        <span class="flex items-center ml-4">
                            <i class="fa-regular fa-clock "></i>
                            <p class="text-[#201654] text-base font-normal ml-2"> ${content.author.published_date.slice(0, 10)} </p>
                        </span>

                        <span class="flex items-center ml-4">
                            <i class="fa-regular fa-eye"></i>
                            <p class="text-[#201654] text-base font-normal ml-2">${content?.total_view?content.total_view : 'no views'}</p>
                        </span>
                    </div>
                    </div>
                     
                </div>
        `
        // modelClick('${content._id }'),
        postContainer.appendChild(divCreat)
        
    })
}

const modelClick = async(news_id) => {
    const response= await fetch(`https://openapi.programming-hero.com/api/news/${news_id}`)
    const data= await response.json()
    const modelSelector = document.getElementById('modal_container');
    modelSelector.innerHTML=''
    const divCreate=document.createElement('div')
    console.log(data.data[0].author.name)
    divCreate.innerHTML = `
    <img src='${data.data[0].author.img}' />
   <h1> ${data.data[0].author.name}</h1>

    
    `
    
    
    modelSelector.appendChild(divCreate)
}

categoryInfo('01')
apidata()