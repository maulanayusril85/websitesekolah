// SDN KIDULDALEM I BANGIL — interaksi dasar
(function () {
  // Pastikan dropdown tertutup saat muat halaman
  document.querySelectorAll('.dropdown.open').forEach(function (d) {
    d.classList.remove('open');
    var btn = d.querySelector('.dropdown-toggle');
    if (btn) btn.setAttribute('aria-expanded', 'false');
  });
  // Tahun otomatis di footer
  var yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // Toggle navigasi mobile
  var toggle = document.querySelector('.nav-toggle');
  var nav = document.getElementById('primary-nav');
  if (toggle && nav) {
    toggle.addEventListener('click', function () {
      var expanded = this.getAttribute('aria-expanded') === 'true';
      this.setAttribute('aria-expanded', String(!expanded));
      nav.classList.toggle('open');
    });
    // Tutup menu saat klik link
    nav.addEventListener('click', function (e) {
      if (e.target.tagName === 'A') {
        nav.classList.remove('open');
        toggle.setAttribute('aria-expanded', 'false');
      }
    });
  }

  // Dropdown Profil
  var dropdownToggles = document.querySelectorAll('.dropdown-toggle');
  dropdownToggles.forEach(function (btn) {
    btn.addEventListener('click', function (e) {
      e.stopPropagation();
      var li = btn.closest('.dropdown');
      var isOpen = li.classList.contains('open');
      document.querySelectorAll('.dropdown.open').forEach(function (d) {
        if (d !== li) d.classList.remove('open');
      });
      li.classList.toggle('open');
      btn.setAttribute('aria-expanded', String(!isOpen));
    });
  });
  // Tutup dropdown jika klik di luar
  document.addEventListener('click', function () {
    document.querySelectorAll('.dropdown.open').forEach(function (d) {
      var btn = d.querySelector('.dropdown-toggle');
      d.classList.remove('open');
      if (btn) btn.setAttribute('aria-expanded', 'false');
    });
  });

  // Tutup dropdown dengan tombol Escape
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') {
      document.querySelectorAll('.dropdown.open').forEach(function (d) {
        var btn = d.querySelector('.dropdown-toggle');
        d.classList.remove('open');
        if (btn) btn.setAttribute('aria-expanded', 'false');
      });
    }
  });

  // Carousel galeri kegiatan (tanpa library)
  function initCarousel(root) {
    var track = root.querySelector('.carousel-track');
    var prev = root.querySelector('.carousel-btn.prev');
    var next = root.querySelector('.carousel-btn.next');
    var dots = root.querySelector('.carousel-dots');
    var items = Array.from(track.children);
    if (!track || items.length === 0) return;

    function itemsPerView() {
      var first = items[0];
      if (!first) return 1;
      var itemW = first.getBoundingClientRect().width || 1;
      return Math.max(1, Math.round(track.clientWidth / itemW));
    }

    function totalPages() { return Math.max(1, Math.ceil(items.length / itemsPerView())); }

    function currentPage() {
      var first = items[0]; if (!first) return 0;
      var itemW = first.getBoundingClientRect().width || 1;
      var per = itemsPerView();
      var page = Math.round(track.scrollLeft / (itemW * per));
      return Math.min(totalPages() - 1, Math.max(0, page));
    }

    function scrollToPage(page) {
      var first = items[0]; if (!first) return;
      var itemW = first.getBoundingClientRect().width || 1;
      var per = itemsPerView();
      var x = page * itemW * per;
      track.scrollTo({ left: x, behavior: 'smooth' });
      updateDots(page);
    }

    function buildDots() {
      if (!dots) return;
      dots.innerHTML = '';
      for (var i = 0; i < totalPages(); i++) {
        var b = document.createElement('button');
        b.type = 'button';
        b.setAttribute('aria-label', 'Slide ' + (i + 1));
        (function (index) { b.addEventListener('click', function () { scrollToPage(index); }); })(i);
        dots.appendChild(b);
      }
      updateDots(currentPage());
    }

    function updateDots(active) {
      if (!dots) return;
      var btns = dots.querySelectorAll('button');
      btns.forEach(function (b, i) { b.setAttribute('aria-current', i === active ? 'true' : 'false'); });
    }

    // Geser 1 card saja saat tombol diklik, dengan loop (wrap-around)
    function stepSize() {
      if (items.length > 1) {
        var step = items[1].offsetLeft - items[0].offsetLeft;
        if (step > 0) return step;
      }
      var first = items[0];
      return (first && first.getBoundingClientRect().width) || 1;
    }

    function currentIndex() {
      var s = stepSize();
      return Math.round(track.scrollLeft / Math.max(1, s));
    }

    function scrollToIndex(index) {
      index = ((index % items.length) + items.length) % items.length; // wrap
      var target = items[index].offsetLeft;
      track.scrollTo({ left: target, behavior: 'smooth' });
    }

    function scrollByItems(delta) {
      var s = stepSize();
      var max = Math.max(0, track.scrollWidth - track.clientWidth);
      var left = track.scrollLeft;
      var tol = 2; // toleransi piksel
      if (delta > 0) {
        if (left >= max - tol) { track.scrollTo({ left: 0, behavior: 'smooth' }); return; }
        track.scrollTo({ left: Math.min(max, left + s), behavior: 'smooth' });
      } else {
        if (left <= tol) { track.scrollTo({ left: max, behavior: 'smooth' }); return; }
        track.scrollTo({ left: Math.max(0, left - s), behavior: 'smooth' });
      }
    }

    if (prev) prev.addEventListener('click', function () { scrollByItems(-1); });
    if (next) next.addEventListener('click', function () { scrollByItems(1); });
    track.addEventListener('scroll', function () { updateDots(currentPage()); });
    window.addEventListener('resize', function () { buildDots(); });

    buildDots();

    // Autoplay dengan pause saat hover/fokus
    var autoplayMs = 4000; var timer = null;
    function stopAutoPlay() { if (timer) { clearInterval(timer); timer = null; } }
    function startAutoPlay() {
      stopAutoPlay();
      // Hanya autoplay jika item lebih banyak dari yang terlihat
      if (items.length <= itemsPerView()) return;
      timer = setInterval(function () { scrollByItems(1); }, autoplayMs);
    }
    // Pause/resume pada interaksi
    root.addEventListener('mouseenter', stopAutoPlay);
    root.addEventListener('mouseleave', startAutoPlay);
    root.addEventListener('focusin', stopAutoPlay);
    root.addEventListener('focusout', startAutoPlay);
    if (prev) prev.addEventListener('click', function(){ stopAutoPlay(); setTimeout(startAutoPlay, 1200); });
    if (next) next.addEventListener('click', function(){ stopAutoPlay(); setTimeout(startAutoPlay, 1200); });
    track.addEventListener('scroll', function(){ /* keep dots in sync; autoplay tetap */ });
    window.addEventListener('resize', function(){ startAutoPlay(); });

    startAutoPlay();
  }

  document.querySelectorAll('.carousel').forEach(initCarousel);

  // Formulir kontak (simulasi kirim)
  var form = document.getElementById('contact-form');
  if (form) {
    var status = form.querySelector('.form-status');
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var data = new FormData(form);
      var nama = String(data.get('nama') || '').trim();
      var email = String(data.get('email') || '').trim();
      var pesan = String(data.get('pesan') || '').trim();

      if (!nama || !email || !pesan) {
        status.textContent = 'Mohon lengkapi semua kolom.';
        status.style.color = '#ef4444';
        return;
      }
      // Validasi email sederhana
      var ok = /.+@.+\..+/.test(email);
      if (!ok) {
        status.textContent = 'Format email tidak valid.';
        status.style.color = '#ef4444';
        return;
      }

      // Simulasi sukses
      status.textContent = 'Terima kasih, pesan Anda telah terkirim (simulasi).';
      status.style.color = 'var(--success)';
      form.reset();
    });
  }

  // Jadikan kartu ekstrakurikuler pada beranda bisa diklik seluruhnya
  var ekCards = document.querySelectorAll('#ekstrakurikuler .card');
  ekCards.forEach(function (card) {
    var link = card.querySelector('a[href]');
    if (!link) return;
    card.style.cursor = 'pointer';
    card.setAttribute('tabindex', '0');
    card.setAttribute('role', 'link');
    if (!card.getAttribute('aria-label')) {
      var label = (card.querySelector('h3') || link).textContent.trim();
      card.setAttribute('aria-label', label);
    }
    card.addEventListener('click', function (e) {
      if (e.target.closest('a')) return; // biarkan klik pada tautan bekerja normal
      window.location.href = link.href;
    });
    card.addEventListener('keydown', function (e) {
      if ((e.key === 'Enter' || e.key === ' ') && !e.target.closest('a')) {
        e.preventDefault();
        window.location.href = link.href;
      }
    });
  });

  // Galeri Kegiatan: jadikan seluruh figure bisa diklik (bukan hanya gambar)
  var galItems = document.querySelectorAll('#galeri-kegiatan .gallery-item, .carousel-track .gallery-item');
  galItems.forEach(function (item) {
    var link = item.querySelector('a[href]');
    if (!link) return;
    item.style.cursor = 'pointer';
    item.setAttribute('tabindex', '0');
    item.setAttribute('role', 'link');
    if (!item.getAttribute('aria-label')) {
      var title = item.querySelector('.cap-title');
      var label = (title ? title.textContent : (item.querySelector('figcaption') || link)).textContent.trim();
      item.setAttribute('aria-label', label);
    }
    item.addEventListener('click', function (e) {
      if (e.target.closest('a')) return; // biarkan klik langsung pada <a>
      window.location.href = link.href;
    });
    item.addEventListener('keydown', function (e) {
      if ((e.key === 'Enter' || e.key === ' ') && !e.target.closest('a')) {
        e.preventDefault();
        window.location.href = link.href;
      }
    });
  });
})();
