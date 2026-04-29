
document.addEventListener('DOMContentLoaded', function () {
    const sidebar = document.getElementById('sidebar');
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const menuMount = document.getElementById('menuMount');
    const navSearch = document.getElementById('navSearch');

    const pillAdmin = document.getElementById('pillAdmin');
    const pillRetailer = document.getElementById('pillRetailer');

    const mediaModal = document.getElementById('mediaModal');
    const mediaBody = document.getElementById('mediaBody');
    const mediaTitle = document.getElementById('mediaTitle');
    const mediaFullscreenBtn = document.getElementById('mediaFullscreenBtn');

    const ROLE_KEY = 'bos_manual_role';
    let currentRole = localStorage.getItem(ROLE_KEY) || 'admin'; // default admin
    let __pzCleanup = null;

    // ===================== MENUS =====================
    const menus = {
    admin: [
        { title:"Dashboard", icon:"fa-house", collapsed:false, links:[ {id:"admin-dashboard", label:"Admin Dashboard", icon:"fa-gauge-high"} ] },
        { title:"Admin Console", icon:"fa-gears", collapsed:true, links:[
        { id:"admin-utility-services-master", label:"Utility Services Master", icon:"fa-screwdriver-wrench" },
        { id:"admin-travel-services-master", label:"Travel Services Master", icon:"fa-plane-departure" },
        { id:"admin-manage-subscription", label:"Manage Subscription", icon:"fa-id-card" },
        { id:"admin-manage-feature", label:"Manage Feature", icon:"fa-toggle-on" },
        { id:"admin-bank-master", label:"Bank Master", icon:"fa-building-columns" },
        { id:"admin-manage-promo-code", label:"Manage Promo Code", icon:"fa-solid fa-gift" }
        ]},
        { title:"Core Master", icon:"fa-cubes", collapsed:true, links:[
        { id:"admin-district-master", label:"District Master", icon:"fa-map-location-dot" },
        { id:"admin-department-master", label:"Department Master", icon:"fa-layer-group" },
        { id:"admin-designation-master", label:"Designation Master", icon:"fa-user-tag" },
        { id:"admin-manage-banner", label:"Manage Banner", icon:"fa-images" }
        ]},
        { title:"MemberShip", icon:"fa-users", collapsed:true, links:[
        { id:"admin-create-admin-role", label:"Create Admin Role", icon:"fa-user-plus" },
        { id:"admin-manage-admin-role", label:"Manage Admin Role", icon:"fa-user-gear" },
        { id:"admin-membership-manage-retailer", label:"Manage Retailer", icon:"fa-users" }
        ]},
        { title:"Retailer Operations", icon:"fa-store", collapsed:true, links:[
        { id:"admin-create-retailer", label:"Create Retailer", icon:"fa-store" },
        { id:"admin-edit-retailer", label:"Edit Retailer", icon:"fa-pen-to-square" },
        { id:"admin-retailer-detail", label:"Retailer Detail", icon:"fa-address-card" } 
        ]},
        { title:"Manage Wallet", icon:"fa-wallet", collapsed:true, links:[
        { id:"admin-wallet-transfer", label:"Wallet Transfer", icon:"fa-wallet" }
        ]},
        { title:"Employee Manage", icon:"fa-users-gear", collapsed:true, links:[
        { id:"admin-manage-employee", label:"Manage Employee", icon:"fa-users-gear" }
        ]},
        { title:"Make Payment", icon:"fa-money-check-dollar", collapsed:true, links:[
        { id:"admin-make-payment-approval", label:"Make Payment Approval", icon:"fa-circle-check" },
        { id:"admin-make-payment-report", label:"Make Payment Report", icon:"fa-chart-column" }
        ]},
        { title:"User Setting", icon:"fa-gear", collapsed:true, links:[
        { id:"user-notification-master", label:"User Notification Master", icon:"fa-bell" },
        { id:"settings", label:"Settings", icon:"fa-sliders" }
        ]},
        { title:"Refunds & Disputes", icon:"fa-solid fa-scale-balanced", collapsed:true, links:[
        { id:"transaction-dispute", label:"Transaction Dispute", icon:"fa-solid fa-arrow-right-arrow-left"},
        { id:"cancelation-dispute", label:"Cancelation Dispute", icon:"fa-solid fa-ban" },
        { id:"cancel-dispute-report", label:"Cancel Dispute Report", icon:"fa-solid fa-file-circle-xmark" },
        { id:"transaction-dispute-report", label:"Transactional Dispute Report", icon:"fa-solid fa-file-invoice-dollar" }
        ]},
        { title:"Support Desk", icon:"fa-headset", collapsed:true, links:[
        { id:"admin-ticket-management", label:"Ticket Management", icon:"fa-headset" },
        { id:"admin-assign-ticket", label:"Assign Ticket", icon:"fa-user-check" } 
        ]},
        { title:"Report", icon:"fa-chart-line", collapsed:true, links:[
        { id:"admin-transaction-report", label:"Transaction Report", icon:"fa-chart-line" },
        { id:"admin-vpa-transaction-report", label:"VPA Transaction Report", icon:"fa-receipt" },
        { id:"admin-subscription-charge-report", label:"Subscription Charge Report", icon:"fa-file-invoice" }
        // { id:"admin-services-report", label:"Services Report", icon:"fa-layer-group" }
        ]}
    ],
    retailer: [
        { title:"Dashboard", icon:"fa-house", collapsed:false, links:[
        { id:"retailer-dashboard", label:"Retailer Dashboard", icon:"fa-gauge-high" }
        ]},
        { title:"Services", icon:"fa-screwdriver-wrench", collapsed:true, links:[
        {id:"retailer-services", label:"Retailer Services", icon:"fa-solid fa-layer-group"}
        ]},
        { title:"Make Payment", icon:"fa-money-check-dollar", collapsed:true, links:[
        { id:"retailer-make-payment-request", label:"Make Payment Request", icon:"fa-file-circle-plus" },
        { id:"retailer-make-payment-report", label:"Make Payment Report", icon:"fa-chart-column" }
        ]},
        { title:"Subscription Services", icon:"fa-arrows-rotate", collapsed:true, links:[
        { id:"retailer-renew-service", label:"Renew Service", icon:"fa-rotate" }
        ]},
        { title:"Offer and Rewards", icon:"fa-gift", collapsed:true, links:[
        { id:"retailer-services-promo-codes", label:"Services Promo Codes", icon:"fa-ticket" },
        { id:"retailer-wallet-promo-codes", label:"Wallet Promo Codes", icon:"fa-gift" }
        ]},
        { title:"Manage Kyc", icon:"fa-id-card-clip", collapsed:true, links:[
        { id:"retailer-update-profiles", label:"Update Profiles", icon:"fa-user-pen" }
        ]},
        { title:"Refunds & Disputes", icon:"fa-solid fa-scale-balanced", collapsed:true, links:[
        { id:"retailer-cancel-dispute-report", label:"Cancel Dispute Report", icon:"fa-solid fa-file-circle-xmark" },
        { id:"retailer-transaction-dispute-report", label:"Transactional Dispute Report", icon:"fa-solid fa-file-invoice-dollar" }
        ]},
        { title:"Support Desk", icon:"fa-headset", collapsed:true, links:[
        { id:"retailer-ticket-support", label:"Ticket & Support", icon:"fa-comments" }
        ]},
        { title:"Report", icon:"fa-chart-line", collapsed:true, links:[
        { id:"retailer-transaction-report", label:"Transaction Report", icon:"fa-chart-line" },
        { id:"retailer-vpa-transaction-report", label:"VPA Transaction Report", icon:"fa-receipt" },
        { id:"retailer-subscription-charge-report", label:"Subscription Charge Report", icon:"fa-file-invoice" },
        { id:"retailer-my-booking-history", label:"My Booking History", icon:"fa-suitcase-rolling" }
        ]}

    ]
    };

    // ===================== HELPERS =====================
    function showSection(sectionId){
    document.querySelectorAll('.content-section').forEach(sec => sec.classList.remove('active'));
    const target = document.getElementById(sectionId);
    if (target) target.classList.add('active');
    window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    function buildMenu(role){
    menuMount.innerHTML = '';

    (menus[role] || []).forEach(group => {
        const section = document.createElement('div');
        section.className = 'nav-section' + (group.collapsed ? ' collapsed' : '');

        const heading = document.createElement('button');
        heading.className = 'nav-heading';
        heading.type = 'button';
        heading.innerHTML = `
        <span class="left">
            <i class="fa-solid ${group.icon}"></i>
            <span>${group.title}</span>
        </span>
        <i class="fa-solid fa-chevron-down chev"></i>
        `;
        heading.addEventListener('click', () => section.classList.toggle('collapsed'));

        const ul = document.createElement('ul');
        ul.className = 'nav-links';

        group.links.forEach(link => {
        const li = document.createElement('li');
        li.innerHTML = `
            <a href="#" data-section="${link.id}">
            <i class="fa-solid ${link.icon}"></i>
            <span>${link.label}</span>
            </a>
        `;
        ul.appendChild(li);
        });

        section.appendChild(heading);
        section.appendChild(ul);
        menuMount.appendChild(section);
    });

    // click handlers
    menuMount.querySelectorAll('a[data-section]').forEach(a => {
        a.addEventListener('click', (e) => {
        e.preventDefault();
        openAndHighlight(a.dataset.section);
        if (window.matchMedia('(max-width: 768px)').matches) sidebar.classList.remove('active');
        });
    });

    applySearchFilter(navSearch.value || '');
    }

    function openAndHighlight(sectionId){
    showSection(sectionId);

    menuMount.querySelectorAll('.nav-links a').forEach(a => {
        a.classList.remove('active');
        a.removeAttribute('aria-current');
    });

    const linkEl = menuMount.querySelector(`.nav-links a[data-section="${sectionId}"]`);
    if (linkEl){
        linkEl.classList.add('active');
        linkEl.setAttribute('aria-current','page');

        const parentGroup = linkEl.closest('.nav-section');
        if (parentGroup) parentGroup.classList.remove('collapsed');

        linkEl.scrollIntoView({ block:'center', behavior:'smooth' });
    }
    }

    function setRole(role){
    currentRole = role;
    localStorage.setItem(ROLE_KEY, role);

    pillAdmin.classList.toggle('active', role === 'admin');
    pillRetailer.classList.toggle('active', role === 'retailer');

    buildMenu(role);

    openAndHighlight(role === 'admin' ? 'admin-dashboard' : 'retailer-dashboard');
    }

    function applySearchFilter(query){
    const q = (query || '').trim().toLowerCase();
    const sections = menuMount.querySelectorAll('.nav-section');

    sections.forEach(section => {
        const links = Array.from(section.querySelectorAll('.nav-links a'));
        let anyVisible = false;

        links.forEach(a => {
        const txt = a.innerText.toLowerCase();
        const match = !q || txt.includes(q);
        a.parentElement.style.display = match ? '' : 'none';
        if (match) anyVisible = true;
        });

        section.style.display = anyVisible ? '' : 'none';
        if (q && anyVisible) section.classList.remove('collapsed');
    });
    }

    // ===================== MEDIA VIEWER =====================
    function openMedia(src, titleText){
      mediaTitle.innerHTML = `<i class="fa-solid fa-photo-film"></i> ${titleText || 'Preview'}`;

      const ext = (src || '').split('.').pop().toLowerCase();
      const isVideo = ['mp4','webm','ogg'].includes(ext);

      mediaBody.innerHTML = '';

      if (isVideo){
        mediaBody.innerHTML = `
          <video src="${src}" controls autoplay playsinline data-modal-video></video>
        `;
      } else {
        mediaBody.innerHTML = `
          <div class="pz-wrap" id="pzWrap">
            <img class="pz-img" id="pzImg" src="${src}" alt="${titleText || 'Preview'}" draggable="false">
          </div>
        `;
        enablePanZoom();  // ✅ enables mouse zoom + drag for images
      }

      mediaModal.classList.add('open');
      mediaModal.setAttribute('aria-hidden', 'false');
    }
    
    function enablePanZoom(){

      if (typeof __pzCleanup === 'function') {
        __pzCleanup();
        __pzCleanup = null;
      }

      const wrap = document.getElementById('pzWrap');
      const img  = document.getElementById('pzImg');
      if (!wrap || !img) return;

      img.setAttribute('draggable', 'false');
      const onNativeDragStart = (e) => e.preventDefault();
      img.addEventListener('dragstart', onNativeDragStart);

      let scale = 1;
      let minScale = 0.2;
      let maxScale = 6;

      let tx = 0, ty = 0;

      let dragging = false;
      let startX = 0, startY = 0;
      let startTx = 0, startTy = 0;

      const clamp = (v, min, max) => Math.max(min, Math.min(max, v));

      function apply(){
        img.style.transform = `translate(${tx}px, ${ty}px) scale(${scale})`;
      }

      // PERFECT FIT TO SCREEN (always centered)
      function fitToScreen(){
        const vw = wrap.clientWidth;
        const vh = wrap.clientHeight;

        const nw = img.naturalWidth;
        const nh = img.naturalHeight;

        if (!vw || !vh || !nw || !nh) return;

        const fitScale = Math.min(vw / nw, vh / nh);

        scale = fitScale;
        minScale = fitScale;  // do not allow zoom-out smaller than fit

        // keep centered (pz-wrap is flex centered)
        tx = 0;
        ty = 0;

        stopDragging();
        apply();
      }

      // Ensure layout fully ready before fitting
      function initialize(){
        requestAnimationFrame(() => {
          requestAnimationFrame(() => {
            fitToScreen();
          });
        });
      }

      if (img.complete) initialize();
      else img.onload = initialize;

      // Wheel zoom (zoom around cursor)
      const onWheel = (e) => {
        e.preventDefault();

        const delta = -e.deltaY;
        const zoomFactor = delta > 0 ? 1.10 : 0.90;

        const prevScale = scale;
        scale = clamp(scale * zoomFactor, minScale, maxScale);

        const rect = wrap.getBoundingClientRect();
        const cx = e.clientX - rect.left;
        const cy = e.clientY - rect.top;

        // Keep cursor point stable while zooming
        tx = cx - (cx - tx) * (scale / prevScale);
        ty = cy - (cy - ty) * (scale / prevScale);

        apply();
      };

      // Drag start
      const onMouseDown = (e) => {
        //  only left button
        if (e.button !== 0) return;
        //  prevents selection / native drag hints
        e.preventDefault();

        dragging = true;
        wrap.classList.add('dragging');

        startX = e.clientX;
        startY = e.clientY;
        startTx = tx;
        startTy = ty;
      };

      // Drag move
      const onMouseMove = (e) => {
        if (!dragging) return;
        tx = startTx + (e.clientX - startX);
        ty = startTy + (e.clientY - startY);
        apply();
      };

      //  bulletproof stop (fixes "stuck grabbing")
      function stopDragging(){
        if (!dragging) return;
        dragging = false;
        wrap.classList.remove('dragging');
      }

      // Double click reset to fit
      const onDblClick = () => {
        fitToScreen();
      };

      //  stop drag if pointer leaves, tab switches, etc.
      const onBlur = () => stopDragging();
      const onVis = () => { if (document.hidden) stopDragging(); };
      const onWrapLeave = () => stopDragging();

      wrap.addEventListener('wheel', onWheel, { passive:false });
      wrap.addEventListener('mousedown', onMouseDown);
      window.addEventListener('mousemove', onMouseMove);
      window.addEventListener('mouseup', stopDragging);
      wrap.addEventListener('mouseleave', onWrapLeave);
      window.addEventListener('blur', onBlur);
      document.addEventListener('visibilitychange', onVis);
      wrap.addEventListener('dblclick', onDblClick);

      //  Re-fit on fullscreen change
      const onFs = () => {
        requestAnimationFrame(() => {
          requestAnimationFrame(() => {
            fitToScreen();
          });
        });
      };
      document.addEventListener('fullscreenchange', onFs);

      //  Re-fit on window resize
      window.addEventListener('resize', fitToScreen);

      //  expose cleanup (important because you rebuild modal HTML each time)
      __pzCleanup = () => {
        wrap.removeEventListener('wheel', onWheel);
        wrap.removeEventListener('mousedown', onMouseDown);
        window.removeEventListener('mousemove', onMouseMove);
        window.removeEventListener('mouseup', stopDragging);
        wrap.removeEventListener('mouseleave', onWrapLeave);
        window.removeEventListener('blur', onBlur);
        document.removeEventListener('visibilitychange', onVis);
        wrap.removeEventListener('dblclick', onDblClick);
        document.removeEventListener('fullscreenchange', onFs);
        window.removeEventListener('resize', fitToScreen);

        img.removeEventListener('dragstart', onNativeDragStart);
      };
    }
    
    function closeMedia(){
    mediaModal.classList.remove('open');
    mediaModal.setAttribute('aria-hidden', 'true');
    mediaBody.innerHTML = '';
    document.body.style.overflow = '';
    }

    // ===================== EVENTS =====================
    mobileMenuBtn.addEventListener('click', () => sidebar.classList.toggle('active'));

    pillAdmin.addEventListener('click', () => setRole('admin'));
    pillRetailer.addEventListener('click', () => setRole('retailer'));

    navSearch.addEventListener('input', (e) => applySearchFilter(e.target.value));

    // Single click delegate (jump + media + close)
    document.addEventListener('click', (e) => {

  /* ==================================================
     TYPE 1: CROSS-MODULE / CROSS-PAGE JUMP (data-jump)
  ================================================== */
  const jumpEl = e.target.closest('[data-jump]');
  if (jumpEl){
      const target = jumpEl.getAttribute('data-jump');
      if (target) openAndHighlight(target);
      return;
  }

  /* ==================================================
     TYPE 2: SAME-PAGE SCROLL (href="#mr-...")
  ================================================== */
  const anchor = e.target.closest('a[href^="#"]');
  if (anchor) {
    const hash = anchor.getAttribute('href');
    if (!hash || hash === '#') return;

    const id = hash.slice(1);
    const targetEl = document.getElementById(id);

    if (targetEl) {
      e.preventDefault(); // ✅ stop browser jump-to-top
      targetEl.setAttribute('tabindex', '-1');
      targetEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
      targetEl.focus({ preventScroll: true });
    }
    return;
  }

  /* ==================================================
     MEDIA VIEWER
  ================================================== */
  const mediaTrigger = e.target.closest('[data-media]');
  if (mediaTrigger) {
    e.preventDefault();
    const src = mediaTrigger.getAttribute('data-media');
    const title = mediaTrigger.getAttribute('data-title') || 'Preview';
    if (src) openMedia(src, title);
    return;
  }

  /* ==================================================
     CLOSE MEDIA
  ================================================== */
  if (e.target.matches('[data-close="1"]') || e.target.closest('[data-close="1"]')) {
    e.preventDefault();
    closeMedia();
    return;
  }

}, true); //  capture mode = more reliable


  // ESC closes modal | SPACE toggles play/pause
document.addEventListener('keydown', (e) => {
  if (!mediaModal.classList.contains('open')) return;

  // ESC closes
  if (e.key === 'Escape') {
    closeMedia();
    return;
  }

  // Space toggles play/pause for video in modal
  if (e.code === 'Space') {
    const vid = mediaBody.querySelector('video[data-modal-video]');
    if (vid) {
      e.preventDefault(); // prevents page scroll
      if (vid.paused) vid.play();
      else vid.pause();
    }
  }
});

    // Fullscreen
    mediaFullscreenBtn.addEventListener('click', () => {
    const box = mediaModal.querySelector('.media-box');
    if (!document.fullscreenElement) box.requestFullscreen?.();
    else document.exitFullscreen?.();
    });

    // ===================== INIT =====================
    setRole(currentRole);

    // If you want welcome first, use this instead:
    // buildMenu(currentRole);
    // showSection('welcome-section');
});

function stabilizeScrub(video){
  if (!video) return;

  // Stop loop fighting while scrubbing
  video.addEventListener('seeking', () => {
    video._wasLoop = video.loop;
    video.loop = false;
    video.pause();
  });

  // Resume cleanly after seek completes
  video.addEventListener('seeked', async () => {
    // If data isn't ready, wait briefly for buffering
    if (video.readyState < 2) {
      await new Promise(res => {
        const onCanPlay = () => { video.removeEventListener('canplay', onCanPlay); res(); };
        video.addEventListener('canplay', onCanPlay, { once: true });
        // safety timeout so it doesn't hang forever
        setTimeout(res, 1200);
      });
    }
    try { await video.play(); } catch(e) {}
    if (video._wasLoop) video.loop = true;
  });

  // If browser stalls, force a reload of current frame
  video.addEventListener('stalled', () => {
    // triggers refetch in some cases
    video.load();
  });
}

// Apply to all videos on page
document.querySelectorAll('video').forEach(stabilizeScrub);

(function () {
  const root = document;

  function smoothGoTo(hash) {
    if (!hash) return;

    const id = hash.replace("#", "");
    const target = document.getElementById(id);
    if (!target) return;

    // Smooth scroll (same feel as manual scrolling)
    target.scrollIntoView({ behavior: "smooth", block: "start" });

    // Update URL hash WITHOUT instant jump
    if (history && history.pushState) {
      history.pushState(null, "", hash);
    } else {
      // fallback
      location.hash = hash;
    }
  }

  root.addEventListener("click", (e) => {
    const card = e.target.closest(".content-section .tm-step[data-href]");
    if (!card) return;

    // allow normal click for inner links
    if (e.target.closest("a")) return;

    e.preventDefault();
    smoothGoTo(card.getAttribute("data-href"));
  });

  root.addEventListener("keydown", (e) => {
    const card = e.target.closest(".content-section .tm-step[data-href]");
    if (!card) return;

    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      smoothGoTo(card.getAttribute("data-href"));
    }
  });
})();