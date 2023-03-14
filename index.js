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
	var counter = 0;
    	var timer = setInterval(function() {
      // 隱藏當前顯示的圖片
      		images[counter].classList.remove('current');

      // 計算下一個要顯示的圖片的索引
      		counter = (counter + 1) % images.length;

      // 顯示下一個圖片
      		images[counter].classList.add('current');
    	}, 3000);
</style>
