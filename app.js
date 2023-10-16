const LoadNewsData = async (categoryId, sortView = false) => {
  try {
      const response = await fetch(
          `https://openapi.programming-hero.com/api/videos/category/${categoryId}`
      );
      const data = await response.json();
      if (sortView === true) {
          data.data.sort((a, b) => {
              const viewA = parseInt(a.others.views.replace('K', '')) || 0;
              const viewB = parseInt(b.others.views.replace('K', '')) || 0;
              return viewB - viewA;
          });
      }
      return data.data;
  } catch (error) {
      console.error('Unable to load news feed :', error);
      return [];
  }
};

const displayNewsData = async (categoryId, sortView = false) => {
  try {
      const postData = await LoadNewsData(categoryId, sortView);
      let errorContainer;
      const cardContainer = document.getElementById('post_container');
      cardContainer.innerHTML = '';
      errorContainer = document.getElementById('ErrorMessage')
      errorContainer.innerHTML = ''

      if (postData.length > 0) {
          postData?.forEach((postContent) => {
              const verified = postContent.authors[0].verified
              const seconds = postContent.others.posted_date;
              const totalMinutes = Math.floor(seconds / 60)
              const hours = Math.floor(totalMinutes / 60)
              const minutes = totalMinutes % 60

              const icon = `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
          <g clip-path="url(#clip0_11_34)">
          <path d="M19.375 10.0001C19.375 10.8001 18.3922 11.4595 18.1953 12.197C17.9922 12.9595 18.5063 14.022 18.1203 14.6892C17.7281 15.3673 16.5484 15.4486 15.9984 15.9986C15.4484 16.5486 15.3672 17.7282 14.6891 18.1204C14.0219 18.5064 12.9594 17.9923 12.1969 18.1954C11.4594 18.3923 10.8 19.3751 10 19.3751C9.2 19.3751 8.54062 18.3923 7.80312 18.1954C7.04062 17.9923 5.97813 18.5064 5.31094 18.1204C4.63281 17.7282 4.55156 16.5486 4.00156 15.9986C3.45156 15.4486 2.27187 15.3673 1.87969 14.6892C1.49375 14.022 2.00781 12.9595 1.80469 12.197C1.60781 11.4595 0.625 10.8001 0.625 10.0001C0.625 9.20012 1.60781 8.54075 1.80469 7.80325C2.00781 7.04075 1.49375 5.97825 1.87969 5.31106C2.27187 4.63293 3.45156 4.55168 4.00156 4.00168C4.55156 3.45168 4.63281 2.272 5.31094 1.87981C5.97813 1.49387 7.04062 2.00793 7.80312 1.80481C8.54062 1.60793 9.2 0.625122 10 0.625122C10.8 0.625122 11.4594 1.60793 12.1969 1.80481C12.9594 2.00793 14.0219 1.49387 14.6891 1.87981C15.3672 2.272 15.4484 3.45168 15.9984 4.00168C16.5484 4.55168 17.7281 4.63293 18.1203 5.31106C18.5063 5.97825 17.9922 7.04075 18.1953 7.80325C18.3922 8.54075 19.375 9.20012 19.375 10.0001Z" fill="#2568EF"/>
          <path d="M12.7094 7.20637L9.14062 10.7751L7.29062 8.92668C6.88906 8.52512 6.2375 8.52512 5.83594 8.92668C5.43437 9.32824 5.43437 9.97981 5.83594 10.3814L8.43125 12.9767C8.82187 13.3673 9.45625 13.3673 9.84687 12.9767L14.1625 8.66106C14.5641 8.25949 14.5641 7.60793 14.1625 7.20637C13.7609 6.80481 13.1109 6.80481 12.7094 7.20637Z" fill="#FFFCEE"/>
           </g>
             <defs>
           <clipPath id="clip0_11_34">
            <rect width="20" height="20" fill="white"/>
            </clipPath>
            </defs>
      </svg>`
              const postDiv = document.createElement('div')
              postDiv.innerHTML = `
        <div class="relative">
          <img class="w-full h-52 rounded-lg" src=" ${postContent.thumbnail}" alt="">
          <span id='addTime' class="bg-headingColor text-xs font-medium text-white rounded absolute bottom-3  right-3 px-1"> 
          ${hours ? hours : ''} ${hours ? 'hrs' : ''}  ${minutes ? minutes : ''}  ${minutes ? 'min ago' : ''}
          </span>
        </div>
        <div class="flex gap-x-4 mt-5">
          <img class="w-11 h-11 rounded-full" src=" ${postContent.authors[0].profile_picture} " alt="Author Prifile"/>
          <div>
            <h1 class="text-headingColor text-base font-semibold"> ${postContent.title} </h1>
            <h4 class="text-sm text-textColor font-normal py-1  flex gap-x-2"> ${postContent.authors[0].profile_name} <span  class='inline'> ${verified ? icon : ''} </span> </h4>
            <h4 class="text-sm text-textColor font-normal"> ${postContent.others.views ? postContent.others.views : 'no views'} views </h4>
          </div>
        </div> `;

              cardContainer.appendChild(postDiv);
          })
      } else {
          {
              const createErrorDiv = document.createElement('div');
              createErrorDiv.innerHTML = '';

              createErrorDiv.classList = 'my-10 w-96 mx-auto text-center'
              createErrorDiv.innerHTML = `
        <img class=" mb-8 inline"  src="./image/Icon.png" alt="">
            <h1 class="text-3xl text-headingColor font-bold">Oops!! Sorry, There is no content here</h1>
        `;
              errorContainer.appendChild(createErrorDiv);
          }
      }
  } catch (error) {
    console.error('Unable to load news feed :', error);
  }
};

const category = async () => {
  try {
      const url = 'https://openapi.programming-hero.com/api/videos/categories'
      const response = await fetch(url)
      const data = await response.json()
      const tabContainer = document.getElementById('category_container');
      const trimmedData = data.data.slice(0);
      trimmedData.forEach((menuItem) => {
          const div = document.createElement('div');
          div.innerHTML = '';
          div.innerHTML = `
                  <button data-category="${menuItem.category_id}" class="text-lg font-semibold bg-[#25252526] text-textColor py-2 px-6 rounded-md m-3 focus:bg-PrimeryColor focus:text-white ">${menuItem.category}</button>
              `;
          tabContainer.appendChild(div);
      });
      tabContainer.addEventListener('click', (event) => {
          const categoryId = event.target.getAttribute('data-category');
          if (categoryId) {
              displayNewsData(categoryId);

              const sortButton = document.getElementById('sortview');
              sortButton.addEventListener('click', () => {
                  displayNewsData(categoryId, true);
              });
          }
      });
  } catch (error) {
    console.error('Unable to load news feed :', error);
  }
};
displayNewsData(1000);
category();