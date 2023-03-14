<style>
		/* 用於電腦佈局的CSS樣式 */
		.desktop-layout {
			display: block;
		}

		/* 用於手機佈局的CSS樣式 */
		.mobile-layout {
			display: none;
		}

		/* 使用媒體查詢進行佈局切換 */
		@media screen and (max-width: 768px) {
			.desktop-layout {
				display: none;
			}

			.mobile-layout {
				display: block;
			}
		}


    var myDiv = document.getElementById('gundong-images');

    // 獲取所有圖片元素
    var images = myDiv.getElementsByTagName('img');

    // 計算所有圖片的總寬度
    var totalWidth = 0;
    for (var i = 0; i < images.length; i++) {
      totalWidth += images[i].width;
    }

    // 設置定時器，在3秒後滾動圖片
    var scrollInterval = setInterval(function() {
      // 獲取當前滾動的距離
      var currentScroll = myDiv.scrollLeft;

      // 計算下一個滾動位置
      var nextScroll = currentScroll + images[0].width;
      if (nextScroll >= totalWidth) {
        nextScroll = 0;
      }

      // 滾動到下一個位置
      myDiv.scrollTo({
        left: nextScroll,
        behavior: 'smooth'
      });
    }, 3000);
</style>
