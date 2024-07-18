export function createGalleryMarkup(items = []) {
  return items
    .map(
      ({
        webformatURL,
        largeImageURL,
        tags,
        likes,
        views,
        comments,
        downloads,
      }) => {
        return `
        <li class="gallery-item">
          <a href="${largeImageURL}" class="gallery-link">
            <div class="card-wrapper-img">
              <img
                class="card-img"
                src="${webformatURL}"
                alt="${tags}"
              />
            </div>
            <div class="card-info">
              <div class="card-info-colum">
                <p class="card-info-title">likes</p>
                <p class="card-info-value">${likes}</p>
              </div>
              <div class="card-info-colum">
                <p class="card-info-title">views</p>
                <p class="card-info-value">${views}</p>
              </div>
              <div class="card-info-colum">
                <p class="card-info-title">comments</p>
                <p class="card-info-value">${comments}</p>
              </div>
              <div class="card-info-colum">
                <p class="card-info-title">downloads</p>
                <p class="card-info-value">${downloads}</p>
              </div>
            </div>
          </a>
        </li>`;
      }
    )
    .join('');
}
