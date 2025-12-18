'use strict';
(function ($) {
    const config = {
        init() {
            this.navbarCollapse();
            this.scrollToTop();
            this.fixedHeader();
            this.backgroundImage();
            this.customCursor();
            this.activeMenuClass($("ul.sidebar-menu-list"));
            this.togglePassword();
            this.activeSelect2();
            this.activeRangeSlider();
            this.testimonialSlider();
            this.clientSlider();
            this.teamSlider();
            this.memberSlider();
            this.activeOdometer();
            this.sectionSubheadingBg();

            //! Project Owner Preference
            this.hideNavbar();
            this.sidebarDropdown();
            this.userDropdown();
            this.sidebarOverlay();
            this.customDropdown();
            this.activeApexBarChat();
            this.activeApexPieChat();
            this.activeFlatpickr();


        },

        navbarCollapse() {
            function hideNavbarCollapse() {
                new bootstrap.Collapse($('.navbar-collapse')[0]).hide();
                $('.navbar-collapse').trigger('hide.bs.collapse');
            }

            $('.navbar-collapse').on({
                'show.bs.collapse': function () {
                    $('body').addClass('scroll-hide');
                    $('.body-overlay').addClass('show').on('click', hideNavbarCollapse);
                },
                'hide.bs.collapse': function () {
                    $('body').removeClass('scroll-hide');
                    $('.body-overlay').removeClass('show').unbind('click', hideNavbarCollapse);
                },
            });

        },

        fixedHeader() {
            $(window).on("scroll", function () {
                if ($(window).scrollTop() >= 300) {
                    $(".header").addClass("fixed-header");
                } else {
                    $(".header").removeClass("fixed-header");
                }
            });
        },

        scrollToTop() {
            const btn = $(".scroll-top");
            $(window).on("scroll", function () {
                if ($(window).scrollTop() >= 300) {
                    btn.addClass("show");
                } else {
                    btn.removeClass("show");
                }
            });

            btn.on("click", function (e) {
                e.preventDefault();
                $("html, body").animate({ scrollTop: 0 }, "300");
            });
        },

        backgroundImage() {
            $(".bg-img").css("background-image", function () {
                return `url(${$(this).data("background-image")})`;
            });

        },
        activeMenuClass(selector) {
            if (!$(selector).length) return;

            let fileName = window.location.pathname.split("/").reverse()[0];
            selector.find("li").each(function () {
                let anchor = $(this).find("a");
                if ($(anchor).attr("href") == fileName) {
                    $(this).addClass("active");
                }
            });
            // if any li has active element add class
            selector.children("li").each(function () {
                if ($(this).find(".active").length) {
                    $(this).addClass("active");
                }
            });
            // if no file name return
            if ("" == fileName) {
                selector.find("li").eq(0).addClass("active");
            }
        },
        togglePassword() {
            $(".toggle-password").on("click", function () {
                $(this).toggleClass("fa-eye");
                var input = $($(this).attr("id"));
                if (input.attr("type") == "password") {
                    input.attr("type", "text");
                } else {
                    input.attr("type", "password");
                }
            });
        },

        activeSelect2() {
            $(".form--select2").each((index, select) => {

                $(select)
                    .wrap('<div class="custom--select2"></div>')
                    .select2({
                        dropdownParent: $(select).closest(".custom--select2"),
                    });
            });

            $(".select2-tag").each((index, select) => {
                $(select)
                    .wrap('<div class="custom--select2"></div>')
                    .select2({
                        dropdownParent: $(select).closest(".custom--select2"),
                    });
            });
        },

        activeRangeSlider() {
            if ($('input[type="range"]').length) {
                $('input[type="range"]').each(function () {
                    $(this).rangeslider({
                        polyfill: false,

                        onSlide: function (position, value) {
                            $(this.$element)
                                .siblings(".price-value")
                                .find(".text")
                                .text(value);
                            $(this.$element).siblings('[type="hidden"]').val(value);
                            $("#earning-amount").text(value * 20 * 30);
                        },
                    });
                });
            }

            // Update earning amount when range slider changes
            $('input[type="range"]').on("change", calculateEarning);

            function calculateEarning() {
                const sellPrice = $('input[name="sell-price"]').val();
                const dailySales = $('input[name="daily-sales"]').val();
                const earningAmount = sellPrice * dailySales * 30;
                $("#earning-amount").text(earningAmount);
            }
        },

        testimonialSlider() {
            const testimonialSliderConfig = {
                slidesToScroll: 1,
                autoplay: false,
                autoplaySpeed: 2000,
                speed: 1500,
                dots: true,
                pauseOnHover: true,
                arrows: false,
                slidesToShow: 1,
                dots: true,
                speed: 500,
                arrows: true,
                prevArrow: $('.testimonial-slider__arrow .arrow-left'),
                nextArrow: $('.testimonial-slider__arrow .arrow-right'),
            };
            $('.testimonial-slider').slick({
                ...testimonialSliderConfig,
                responsive: [
                    {
                        breakpoint: 991,
                        settings: {
                            slidesToShow: 1,
                            variableWidth: false,
                            centerMode: false,
                        },
                    },
                ],
            });

        },
        clientSlider() {
            const sliderConfig = {
                slidesToScroll: 1,
                autoplay: true,
                autoplaySpeed: 2000,
                speed: 1500,
                dots: false,
                pauseOnHover: true,
                arrows: false,
                slidesToShow: 5,
                responsive: [
                    {
                        breakpoint: 1400,
                        settings: {
                            slidesToShow: 4,
                        },
                    },
                    {
                        breakpoint: 991,
                        settings: {
                            slidesToShow: 3,
                        },
                    },
                    {
                        breakpoint: 767,
                        settings: {
                            slidesToShow: 2,
                        },
                    },
                    {
                        breakpoint: 400,
                        settings: {
                            slidesToShow: 1,
                        },
                    },
                ],
            };
            $('.client-slider').slick(sliderConfig);
        },
        teamSlider() {
            const sliderConfig = {
                slidesToScroll: 1,
                autoplay: false,
                autoplaySpeed: 2000,
                speed: 1500,
                dots: true,
                pauseOnHover: true,
                arrows: false,

            };
            $('.team-list').slick({
                ...sliderConfig,
                slidesToShow: 4,
                dots: true,
                speed: 500,

                responsive: [
                    {
                        breakpoint: 1400,
                        settings: {
                            slidesToShow: 3,
                        },
                    },
                    {
                        breakpoint: 991,
                        settings: {
                            slidesToShow: 2,
                        },
                    },
                    {
                        breakpoint: 576,
                        settings: {
                            slidesToShow: 1,
                        },
                    },
                ],
            });
        },

        memberSlider() {
            const sliderConfig = {
                slidesToScroll: 1,
                autoplay: false,
                autoplaySpeed: 2000,
                speed: 1500,
                infinite: true,
                centerMode: true



            };
            $('.testimonial-slider').slick({
                ...testimonialSliderConfig,
                responsive: [
                    {
                        breakpoint: 991,
                        settings: {
                            slidesToShow: 1,
                            variableWidth: false,
                            centerMode: false,
                        },
                    },
                ],
            });

        },
        teamSlider() {
            const sliderConfig = {
                slidesToScroll: 1,
                autoplay: false,
                autoplaySpeed: 2000,
                speed: 1500,
                dots: true,
                pauseOnHover: true,
                arrows: false,

            };
            $('.team-list').slick({
                ...sliderConfig,
                slidesToShow: 4,
                dots: true,
                speed: 500,

                responsive: [
                    {
                        breakpoint: 1400,
                        settings: {
                            slidesToShow: 3,
                        },
                    },
                    {
                        breakpoint: 991,
                        settings: {
                            slidesToShow: 2,
                        },
                    },
                    {
                        breakpoint: 576,
                        settings: {
                            slidesToShow: 1,
                        },
                    },
                ],
            });
        },

        memberSlider() {
            const sliderConfig = {
                slidesToScroll: 1,
                autoplay: false,
                autoplaySpeed: 2000,
                speed: 1500,
                dots: true,
                pauseOnHover: true,
                arrows: false,
                infinite: false,

            };
            $('.member-list').slick({
                ...sliderConfig,
                slidesToShow: 6,
                dots: true,
                speed: 500,

                responsive: [
                    {
                        breakpoint: 1600,
                        settings: {
                            slidesToShow: 5,
                        },
                    },
                    {
                        breakpoint: 1400,
                        settings: {
                            slidesToShow: 4,
                        },
                    },
                    {
                        breakpoint: 1200,
                        settings: {
                            slidesToShow: 3,
                        },
                    },
                    {
                        breakpoint: 991,
                        settings: {
                            slidesToShow: 2,
                        },
                    },
                    {
                        breakpoint: 424,
                        settings: {
                            slidesToShow: 1,
                        },
                    },
                ],
            });
        },
        clientSlider() {
            const sliderConfig = {
                slidesToScroll: 1,
                autoplay: true,
                autoplaySpeed: 0,
                speed: 8000,
                cssEase: 'linear',
                dots: false,
                pauseOnHover: true,
                arrows: false,
                slidesToShow: 7,

                responsive: [
                    {
                        breakpoint: 1399,
                        settings: {
                            slidesToShow: 6,
                        },
                    },
                    {
                        breakpoint: 1199,
                        settings: {
                            slidesToShow: 5,
                        },
                    },
                    {
                        breakpoint: 992,
                        settings: {
                            slidesToShow: 4,
                        },
                    },
                    {
                        breakpoint: 768,
                        settings: {
                            slidesToShow: 3,
                        },
                    },
                    {
                        breakpoint: 376,
                        settings: {
                            slidesToShow: 2,
                        },
                    },
                ],

            };

            $('.all-client').slick(sliderConfig);
            $('.account-client').slick({
                ...sliderConfig, slidesToShow: 5,

                responsive: [
                    {
                        breakpoint: 991,
                        settings: {
                            slidesToShow: 4,
                        },
                    },
                    {
                        breakpoint: 576,
                        settings: {
                            slidesToShow: 2,
                        },
                    },
                ]

            });
        },

        activeOdometer() {
            $(".counterUp").each(function () {
                $(this).isInViewport(function (status) {
                    if (status === "entered") {
                        for (
                            var i = 0;
                            i < document.querySelectorAll(".odometer").length;
                            i++
                        ) {
                            var el = document.querySelectorAll(".odometer")[i];
                            el.innerHTML = el.getAttribute("data-odometer-final");
                        }
                    }
                });
            });
        },

        hideNavbar() {
            $('.sidebar-menu__close, .sidebar-overlay').on('click', function () {
                $('.sidebar-menu').removeClass('show-sidebar');
                $('.sidebar-overlay').removeClass('show');
            });
        },

        sidebarDropdown() {
            $('.has-dropdown > a').click(function () {
                $('.sidebar-submenu').slideUp(200);
                if ($(this).parent().hasClass('active')) {
                    $('.has-dropdown').removeClass('active');
                    $(this).parent().removeClass('active');
                } else {
                    $('.has-dropdown').removeClass('active');
                    $(this).next('.sidebar-submenu').slideDown(200);
                    $(this).parent().addClass('active');
                }
            });
        },
        userDropdown() {
            $('.user-info__button').on('click', function () {
                $('.user-info-dropdown').toggleClass('show');
            });
            $('.user-info__button').attr('tabindex', -1).focus();

            $('.user-info__button').on('focusout', function () {
                $('.user-info-dropdown').removeClass('show');
            });

        },
        sidebarOverlay() {
            $('.navigation-bar').on('click', function () {
                $('.sidebar-menu').addClass('show-sidebar');
                $('.sidebar-overlay').addClass('show');
            });
        },
        sectionSubheadingBg() {
            $("[data-bg*='#']").each(function () {
                const bg = $(this).data('bg');
                if (bg) {
                    $(this).css('--data-bg', bg);
                }
            });

        },
        customCursor() {
            function moveCursor(containerSel, itemSel, cursorSel = '.custom-cursor') {
                const $container = $(containerSel);
                const $body = $('body'); // or any other element where you want to add the class

                let $active = null,
                    $cursor = null;
                let parentEl = null;
                let x = 0,
                    y = 0,
                    dirty = false;

                // show on enter
                $container.on('mouseenter', itemSel, function () {
                    $active = $(this);
                    $cursor = $active.find(cursorSel);
                    if (!$cursor.length) {
                        $active = null;
                        $cursor = null;
                        parentEl = null;
                        return;
                    }
                    parentEl = $cursor[0].offsetParent || this;
                    $cursor.addClass('show');
                });

                // hide on leave
                $container.on('mouseleave', itemSel, function () {
                    if (!$active || this !== $active[0]) return;
                    if ($cursor) $cursor.removeClass('show');
                    $active = $cursor = null;
                    parentEl = null;
                });

                // track pointer
                $container.on('mousemove', itemSel, function (e) {
                    if (!$active || this !== $active[0] || !$cursor || !$cursor[0]) return;

                    // if layout changed, keep the parent in sync
                    const currentParent = $cursor[0].offsetParent || this;
                    if (currentParent !== parentEl) parentEl = currentParent;

                    const rect = parentEl.getBoundingClientRect();
                    x = e.clientX - rect.left;
                    y = e.clientY - rect.top;
                    dirty = true;
                });

                // detect when leaving/entering the entire container
                $container.on('mouseenter', function () {
                    $body.removeClass('no-project-card');
                });

                $container.on('mouseleave', function () {
                    $body.addClass('no-project-card');
                });

                // rAF writer
                (function loop() {
                    if (dirty && $cursor && $cursor[0]) {
                        $cursor[0].style.transform = `translate(${x}px, ${y}px) translate(-50%, -50%)`;
                        dirty = false;
                    }
                    requestAnimationFrame(loop);
                })();
            }

            // usage:
            moveCursor('.story-wrapper', '.story-wrapper__item');
        },
        customDropdown() {
            $('.custom-dropdown__selected').on('click', function () {
                $(this).parent().toggleClass('open');
            });

            $('.custom-dropdown__list-item').on('click', function () {

                $(this).addClass('selected').siblings().removeClass('selected')
                    .closest('.custom-dropdown').removeClass('open');
            });

            $(document).on('keyup click', function (evt) {
                if (evt.type === 'keyup' && (evt.keyCode || evt.which) !== 27) return;
                if ($(evt.target).closest('.custom-dropdown__selected').length === 0) {
                    $('.custom-dropdown').removeClass('open');
                }
            });
        },
        activeApexBarChat() {
            if (!$("#apexBarChat").length) return
            var options = {
                series: [
                    { name: "High - 2013", data: [10, 29, 10, 20, 18, 10, 5] },
                    { name: "Low - 2013", data: [5, 20, 15, 25, 10, 15, 10] }
                ],
                chart: {
                    height: 200,
                    type: 'line',
                    dropShadow: { enabled: false },
                    zoom: { enabled: false },
                    toolbar: { show: false },
                    events: {
                        markerClick: function (event, chartContext) {
                            var current = chartContext.w.config.dataLabels.enabled;
                            chartContext.updateOptions({
                                dataLabels: { enabled: !current }
                            });
                        }
                    }
                },
                colors: ['hsl(var(--base))', 'hsl(var(--base-two))'],
                dataLabels: {
                    enabled: false
                },
                markers: {
                    size: 6,
                    colors: ['#fff'],       // marker fill is white
                    strokeColors: 'hsl(var(--base))', // undefined means "use series color"
                    strokeWidth: 1,
                    hover: { size: 8 }
                },
                stroke: {
                    curve: 'straight',
                    width: 2
                },
                grid: {
                    borderColor: '#e7e7e7',
                    row: { colors: ['transparent', 'transparent'], opacity: 0.5 }
                },
                xaxis: {
                    categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
                },
                yaxis: {
                    min: 0,
                    max: 30
                },
                legend: {
                    show: true,
                    position: 'top'
                }
            };

            var chart = new ApexCharts($("#apexBarChat")[0], options);

            chart.render().then(function () {
                var $legend = $("#apexBarChat .apexcharts-legend");
                if ($legend.length) {
                    $(".chart-card__header-list").append($legend);
                    $legend.css({ position: "static" });
                }
            });
        },
        activeApexPieChat() {
            if (!$("#apexPieChat").length) return
            var options = {
                series: [44, 55, 41, 17, 15],
                chart: {
                    type: 'donut', height: 500

                },
                legend: {
                    position: 'top',
                    fontSize: 'clamp(0.875rem, 0.8181rem + 0.2427vw, 1rem)',
                },
                plotOptions: {
                    pie: {
                        startAngle: -90,
                        endAngle: 90,
                        offsetY: 0
                    }
                },
                grid: {
                    padding: {
                        bottom: 0
                    }
                },
                responsive: [{
                    breakpoint: 480,
                    options: {
                        chart: {
                            width: 300
                        },

                    }
                }, {
                    breakpoint: 375,
                    options: {
                        chart: {
                            width: 230
                        },

                    }
                }]
            };

            var chart = new ApexCharts(document.querySelector("#apexPieChat"), options);
            chart.render();
        },

        activeFlatpickr() {
            $("input[type='date']").flatpickr({
                defaultDate: "today",
                dateFormat: "F j, Y"
            })
        }
    };



    $(document).ready(function () {
        // Active all function
        config.init()

        Fancybox.bind("[data-fancybox]", {
            Carousel: {
                Video: {
                    autoplay: false,
                },
            },
        });

        // Preloader always in bottom;
        $('.preloader').fadeOut()
    })
})(jQuery);






