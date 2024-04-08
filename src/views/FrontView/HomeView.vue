<!-- eslint-disable max-len -->
<template>
  <!-- slider -->
  <section class="slider_section position-relative">
    <div class="slider_bg_box">
      <img src="../../assets/images/slider-bg.jpg" alt="banner背景圖">
    </div>
    <div class="slider_bg"></div>
    <div class="container">
      <div class="col-md-6 ms-auto">
        <div class="detail-box">
          <h1>歡迎來到 <br>泡咖啡</h1>
          <p>從原產地的一株咖啡樹，最終成為您手中的一杯咖啡；我們堅持採購並且烘焙最高品質的咖啡，這是我們一直努力的基本原則；最初的十英呎到最後十英呎的珍貴體驗，為咖啡的故事做了最佳的註解，同時也塑造出咖啡家族的獨特風味及口感特性，閱讀咖啡的故事，可以讓您更瞭解咖啡，豐富您的咖啡體驗。
          </p>
          <br>
          <RouterLink to="/products" class="text-decoration-none">去購物</RouterLink>

        </div>
      </div>
    </div>
  </section>

  <!-- Special section -->
  <section class="spcl_section layout_padding">
    <div class="container">
      <div class="row">
        <div class="col-md-6">
          <div class="detail_container">
            <div class="detail-box">
              <img src="../../assets/images/s1.png" alt="咖啡豆icon">
              <h5>自產有機的咖啡豆</h5>
              <p>我們在種植、採摘和加工咖啡過程中的細心程度越高，咖啡的品質就會越高。以合乎道德的方式從多樣化的供應商網路中採購及購買優質咖啡。與種植者建立良好的合作關係，這確保了我們能順利獲得高品質的咖啡。我們尋找那些能以巨大熱情來進行咖啡種植、採摘和加工的人們，這份熱情要與在進行咖啡豆混合、烘焙、包裝和調製時所具有的熱情相同。這股對咖啡的熱情也反映在我們在咖啡之旅中，對每一項細節的要求。
              </p>
            </div>
            <div class="detail-box">
              <img src="../../assets/images/s2.png" alt="咖啡icon">
              <h5>客製你最愛的飲料風味</h5>
              <p>試試將牛奶更換成低脂牛奶、豆奶或椰奶，或升級為燕麥奶、杏仁堅果奶。還可以調整濃縮咖啡份數、或更換為低咖啡因濃縮咖啡、短濃縮咖啡、或升級特選濃縮咖啡。再試試改變飲料風味，香草、焦糖、榛果、鹹焦糖等四種風味選擇，為你的飲料增添變化。
              </p>
            </div>
            <div class="detail-box">
              <img src="../../assets/images/s3.png" alt="咖啡機icon">
              <h5>台灣在地文化系列商品</h5>
              <p>在地人文美食風情受旅者盛讚，而民間廟宇文化衍生出的各式活動與風俗故事，更是形塑成重要的觀光特色；其中又以媽祖遶境、月老文化和三太子最廣為人知。以陶瓷浮雕搭配精緻貼花工藝，具體呈現在地文化所延伸出的寓意，邀請您一起收藏台灣的美好。

              </p>
            </div>
          </div>
        </div>
        <div class="col-md-6 col-lg-5 ml-auto">
          <div class="img-box">
            <img src="../../assets/images/spcl-img.jpg" alt="咖啡">
          </div> </div>
      </div>
    </div>
  </section>

  <!-- about section -->
  <section class="about_section layout_padding-bottom bg-light" id="about">
    <div class="container">
      <div class="row">
        <div class="col-md-6">
          <div class="img-box">
            <img src="../../assets/images/about-img.jpg" alt="形象圖">

          </div>
        </div>
        <div class="col-md-6"><div class="detail-box">
          <div class="heading_container">
            <h2>關於泡咖啡</h2>
          </div>
          <p>歡迎來到「泡咖啡」！我們是一家專注於帶給您最純正、最風味豐富的咖啡體驗的線上咖啡專賣店。
          </p>
          <RouterLink to="/about" class="text-decoration-none">瞭解更多</RouterLink>
        </div></div>
      </div>
    </div>
  </section>

<!-- products -->
    <div class="arrival">
      <div class="wow animate__animated animate__fadeInUp">
        <h2 class="title text-center">商品類別</h2>
        <div class="line mx-auto"></div>
      </div>
      <div class="row mt-4">
        <div class="col-12 col-md-4 mt-4 px-sm-0 wow animate__animated animate__fadeInUp">
          <div class="arrWrap">
            <router-link to="/products?category=咖啡">
              <div class="arrImg" :style="{backgroundImage: `url(${img.arr1})` }"></div>
            </router-link>
          </div>
          <div class="arrTxt">
            <div class="arrInner text-center">
              <h4>咖啡</h4>
              <p class="text-left mt-3">口感香甜滑順，帶有輕盈的法式香草奶油香氣，為您的味蕾提供美好的享受。</p>
              <router-link to="/products?category=咖啡">
                <div class="btn btn-info">去逛逛</div>
              </router-link>
            </div>
          </div>
        </div>
        <div class="col-12 col-md-4 mt-4 px-sm-0 d-flex flex-column wow animate__animated animate__fadeInUp" data-wow-delay="0.5s">
          <div class="arrWrap order-md-2">
            <router-link to="/products?category=咖啡豆">
              <div class="arrImg" :style="{backgroundImage: `url(${img.arr2})` }"></div>
            </router-link>
          </div>
          <div class="arrTxt order-md-1">
            <div class="arrInner text-center">
              <h4>咖啡豆</h4>
              <p class="text-left mt-3">明亮、清爽的口感，同時展現出細膩的風味層次。猶似陽光輕灑過，吹拂起亮麗微風般的愜意感受。</p>
              <router-link to="/products?category=咖啡豆">
                <div class="btn btn-info">去逛逛</div>
              </router-link>
            </div>
          </div>
        </div>
        <div class="col-12 col-md-4 mt-4 px-sm-0 wow animate__animated animate__fadeInUp" data-wow-delay="1s">
          <div class="arrWrap">
            <router-link to="/products?category=蛋糕">
              <div class="arrImg" :style="{backgroundImage: `url(${img.arr3})` }"></div>
            </router-link>
          </div>
          <div class="arrTxt">
            <div class="arrInner text-center">
              <h4>蛋糕</h4>
              <p class="text-left mt-3">甜度降低，口感更為滑嫩細緻，是與周遭人們分享的療癒甜點。</p>
              <router-link to="/products?category=蛋糕">
                <div class="btn btn-info">去逛逛</div>
              </router-link>
            </div>
          </div>
        </div>
      </div>
    </div>

</template>

<script>

export default {
  data() {
    return {
      img: {
        arr1:
          'https://images.unsplash.com/photo-1485808191679-5f86510681a2?q=80&w=2787&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        arr2:
          'https://images.unsplash.com/photo-1598198152469-172cd80d7a24?q=80&w=1843&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        arr3:
          'https://plus.unsplash.com/premium_photo-1661746615841-5e9d679c5725?q=80&w=2942&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      },
    };
  },
};
</script>
