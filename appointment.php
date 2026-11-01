



<!DOCTYPE html>

<html class="no-js" lang="en">
<head id="Head1">
    <link data-testid="canonical-link" rel="canonical" href="appointment" />

<meta charset="utf-8">
<meta http-equiv="X-UA-Compatible" content="IE=edge">
<meta name="viewport" content="width=device-width, initial-scale=1.0">

            <link rel="icon" sizes="32x32" type="image/png" href="/images/favicon.png" />

<title>Book Appointment | Plain Talk Financial Planning</title><meta name="robots" content="index, follow"/>

<script type="application/ld+json">
    {
  "@context": "https://schema.org",
  "@type": "FinancialService",
  "@id": "https://www.plaintalkfinancial.com",
  "name": "Plain Talk Financial Planning",
  "logo": "/images/logo.png",
  "image": "/images/logo.png",
  "url": "https://www.plaintalkfinancial.com",
  "telephone": "978-992-8772",
  "priceRange": "N/A",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "14 Sanborn Terrace",
    "addressLocality": "Amesbury",
    "addressRegion": "MA",
    "postalCode": "01913",
    "addressCountry": "US"
  }
}
</script>

<link rel="stylesheet" type="text/css" media="" href="/css/vendor/7ac.css" />
<link rel="stylesheet" type="text/css" href="/css/vendor/global-asset-styles.css" />
<link rel="stylesheet" href="/fonts/fonts.css" />
<link rel="stylesheet" type="text/css" href="/css/vendor/sections.css" />
<link rel="stylesheet" type="text/css" href="/css/vendor/footer-Colors.css" />

<!-- Global site tag (gtag.js) - Google Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id=G-90NR43CZBZ"></script>
<script>
	window.dataLayer = window.dataLayer || [];
	function gtag(){window.dataLayer.push(arguments);}
	gtag('js', new Date());
	gtag('config', 'G-90NR43CZBZ', { 'public_id': '398897' });
</script>

<style>
/* Appointment Scheduler */
.appt-scheduler { display: flex; flex-direction: column; gap: 30px; }

/* Step indicators */
.appt-steps { display: flex; justify-content: center; gap: 30px; margin-bottom: 20px; padding: 10px 0; }
.appt-step { display: flex; align-items: center; gap: 8px; color: #bbb; font-weight: 600; font-size: 0.85em; position: relative; white-space: nowrap; }
.appt-step.active { color: #2C7178; }
.appt-step.completed { color: #2C7178; }
.appt-step-number { display: inline-flex; align-items: center; justify-content: center; width: 26px; height: 26px; border-radius: 50%; border: 2px solid #ddd; font-size: 0.8em; flex-shrink: 0; }
.appt-step.active .appt-step-number { border-color: #2C7178; background: #2C7178; color: #fff; }
.appt-step.completed .appt-step-number { border-color: #2C7178; background: #2C7178; color: #fff; }
.appt-step-short { display: none; }

/* Calendar */
.appt-calendar { user-select: none; }
.appt-cal-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 15px; }
.appt-cal-header h3 { margin: 0; font-size: 1.1em; }
.appt-cal-nav { background: none; border: 1px solid #ddd; border-radius: 6px; padding: 6px 12px; cursor: pointer; font-size: 1em; color: #333; }
.appt-cal-nav:hover { background: #f0f0f0; }
.appt-cal-nav:disabled { opacity: 0.3; cursor: default; }
.appt-cal-grid { display: grid; grid-template-columns: repeat(7, 1fr); gap: 4px; text-align: center; }
.appt-cal-dow { font-weight: 600; font-size: 0.75em; color: #999; padding: 8px 0; text-transform: uppercase; }
.appt-cal-day { padding: 10px 4px; border-radius: 8px; font-size: 0.9em; cursor: default; color: #ccc; }
.appt-cal-day.has-slots { color: #333; cursor: pointer; font-weight: 600; }
.appt-cal-day.has-slots:hover { background: #e8f4f5; }
.appt-cal-day.selected { background: #2C7178; color: #fff; }
.appt-cal-day.today { border: 2px solid #B0413E; }

/* Time slots */
.appt-times { display: none; }
.appt-times.visible { display: block; }
.appt-times-date { font-weight: 600; margin-bottom: 12px; color: #333; }
.appt-times-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 8px; }
.appt-time-slot { padding: 10px; border: 1px solid #ddd; border-radius: 8px; text-align: center; cursor: pointer; font-size: 0.9em; transition: all 0.15s; }
.appt-time-slot:hover { border-color: #2C7178; background: #e8f4f5; }
.appt-time-slot.selected { background: #2C7178; color: #fff; border-color: #2C7178; }

/* Details form (step 2) */
.appt-details { display: none; }
.appt-details.visible { display: block; }
.appt-selected-summary { background: #e8f4f5; border-radius: 8px; padding: 14px 18px; margin-bottom: 20px; display: flex; align-items: center; gap: 12px; }
.appt-selected-summary i { color: #2C7178; font-size: 1.3em; }
.appt-selected-summary .appt-summary-text { font-weight: 600; color: #333; }
.appt-change-btn { background: none; border: none; color: #2C7178; cursor: pointer; font-size: 0.85em; text-decoration: underline; margin-left: auto; }

/* Confirmation (step 3) */
.appt-confirmation { display: none; text-align: center; padding: 40px 20px; }
.appt-confirmation.visible { display: block; }
.appt-confirmation i.fa-check-circle { font-size: 3em; color: #2C7178; margin-bottom: 15px; }
.appt-confirmation h3 { margin-bottom: 10px; }
.appt-confirmation p { color: #666; line-height: 1.7; }
.appt-conf-details { background: #f8f9fa; border-radius: 8px; padding: 20px; margin: 20px auto; max-width: 350px; text-align: left; }
.appt-conf-details p { margin: 6px 0; }
.appt-conf-links { margin-top: 20px; }
.appt-conf-links a { display: inline-block; margin: 0 8px; color: #2C7178; }

/* Loading state */
.appt-loading { text-align: center; padding: 40px; color: #999; }
.appt-loading .loader-spinner { margin: 0 auto 15px; width: 30px; height: 30px; border: 3px solid #B6C7BF; border-top: 3px solid #2C7178; border-radius: 50%; animation: spin 0.8s linear infinite; }
@keyframes spin { to { transform: rotate(360deg); } }

/* Error banner */
.appt-error { background: #fde8e8; color: #B0413E; padding: 12px 16px; border-radius: 8px; margin-bottom: 15px; display: none; font-size: 0.9em; }
.appt-error.visible { display: block; }

/* Responsive */
@media (max-width: 768px) {
    .appt-times-grid { grid-template-columns: repeat(2, 1fr); }
    .appt-steps { gap: 16px; padding: 8px 0; }
    .appt-step { font-size: 0.85em; gap: 6px; }
    .appt-step-number { width: 24px; height: 24px; font-size: 0.75em; }
    .appt-step-full { display: none; }
    .appt-step-short { display: inline; }
    .contact-form-card { padding: 25px 15px; }
    .appt-cal-day { padding: 8px 2px; font-size: 0.85em; }
    .appt-cal-dow { font-size: 0.7em; padding: 6px 0; }
}
</style>

</head>

<body class="subpage custompage page-appointment">

<?php include $_SERVER['DOCUMENT_ROOT'] . '/includes/header.php'; ?>

    <div class="body-container">
        <section id="content" class="o-content__container">

            <div class="o-container" data-toggle-header>
                <h1 class="c-custom-pages-heading">Book Appointment</h1>
            </div>

            <!-- Appointment Content -->
            <section class="section section_SimpleText None None" style="background-color: #F8F9FA;">
                <div class="overlay">
                    <div class="o-container c-customsection__container">
                        <div class="o-grid__collapse c-grid__collapse--SimpleText" data-section-type="SimpleText">
                            <div class="contact-layout">

                                <!-- Left: Appointment Scheduler -->
                                <div class="contact-form-card">
                                    <div class="appt-steps">
                                        <div class="appt-step active" data-step="1"><span class="appt-step-number">1</span><span class="appt-step-full">Pick a Time</span><span class="appt-step-short">Time</span></div>
                                        <div class="appt-step" data-step="2"><span class="appt-step-number">2</span><span class="appt-step-full">Your Details</span><span class="appt-step-short">Details</span></div>
                                        <div class="appt-step" data-step="3"><span class="appt-step-number">3</span><span class="appt-step-full">Confirmed</span><span class="appt-step-short">Confirm</span></div>
                                    </div>

                                    <div class="appt-error" id="apptError"></div>

                                    <!-- Step 1: Pick a time -->
                                    <div class="appt-scheduler" id="apptStep1">
                                        <div class="appt-loading" id="apptLoading">
                                            <div class="loader-spinner"></div>
                                            <p>Loading available times...</p>
                                        </div>

                                        <div class="appt-calendar" id="apptCalendar" style="display:none;">
                                            <div class="appt-cal-header">
                                                <button class="appt-cal-nav" id="calPrev" disabled>&lsaquo;</button>
                                                <h3 id="calMonthYear"></h3>
                                                <button class="appt-cal-nav" id="calNext">&rsaquo;</button>
                                            </div>
                                            <div class="appt-cal-grid" id="calGrid"></div>
                                        </div>

                                        <div class="appt-times" id="apptTimes">
                                            <p class="appt-times-date" id="apptTimesDate"></p>
                                            <div class="appt-times-grid" id="apptTimesGrid"></div>
                                        </div>
                                    </div>

                                    <!-- Step 2: Your details -->
                                    <div class="appt-details" id="apptStep2">
                                        <div class="appt-selected-summary" id="apptSummary">
                                            <i class="fa fa-calendar"></i>
                                            <span class="appt-summary-text" id="apptSummaryText"></span>
                                            <button class="appt-change-btn" id="apptChangeTime">Change</button>
                                        </div>

                                        <form id="apptForm">
                                            <div class="contact-form-row">
                                                <div class="contact-form-group">
                                                    <label for="apptFirstName">First Name <span class="required">*</span></label>
                                                    <input class="text-box" id="apptFirstName" type="text" required placeholder="First name" />
                                                </div>
                                                <div class="contact-form-group">
                                                    <label for="apptLastName">Last Name <span class="required">*</span></label>
                                                    <input class="text-box" id="apptLastName" type="text" required placeholder="Last name" />
                                                </div>
                                            </div>
                                            <div class="contact-form-row">
                                                <div class="contact-form-group">
                                                    <label for="apptEmail">Email <span class="required">*</span></label>
                                                    <input class="text-box" id="apptEmail" type="email" required placeholder="you@example.com" />
                                                </div>
                                                <div class="contact-form-group">
                                                    <label for="apptPhone">Phone</label>
                                                    <input class="text-box" id="apptPhone" type="tel" placeholder="(optional)" />
                                                </div>
                                            </div>
                                            <span class="formRobo"><label for="apptAddress">Address</label><input type="text" id="apptAddress" value="" /></span>
                                            <div class="contact-form-group">
                                                <label for="apptMessage">How can we help you?</label>
                                                <textarea id="apptMessage" rows="4" placeholder="Tell us a little about what you'd like to discuss..."></textarea>
                                            </div>
                                            <button type="submit" class="c-btn submit">Book Appointment</button>
                                        </form>
                                    </div>

                                    <!-- Step 3: Confirmation -->
                                    <div class="appt-confirmation" id="apptStep3">
                                        <i class="fa fa-check-circle"></i>
                                        <h3>You're All Set!</h3>
                                        <p>Your appointment has been booked. You'll receive a confirmation email shortly with all the details.</p>
                        <p style="font-size: 0.85em; color: #999; margin-top: 4px;">If you don't see it in your inbox, please check your spam or junk folder.</p>
                                        <div class="appt-conf-details" id="apptConfDetails"></div>
                                        <div class="appt-conf-links" id="apptConfLinks"></div>
                                    </div>
                                </div>

                                <!-- Right: Contact Info -->
                                <div class="contact-info-side">
                                    <div class="contact-info-card">
                                        <h3 style="margin-bottom: 20px; color: #2C7178;">What to Expect</h3>
                                        <p style="margin-bottom: 20px; line-height: 1.7;">Our initial consultation is complimentary. We'll take the time to understand your unique situation, answer your questions, and determine if we're a good fit for each other.</p>
                                        <div class="contact-info-item">
                                            <div class="contact-info-icon"><i class="fa fa-clock-o"></i></div>
                                            <div>
                                                <h4>Duration</h4>
                                                <p>30-45 minutes</p>
                                            </div>
                                        </div>
                                        <div class="contact-info-item">
                                            <div class="contact-info-icon"><i class="fa fa-video-camera"></i></div>
                                            <div>
                                                <h4>Format</h4>
                                                <p>Phone, video, or in-person</p>
                                            </div>
                                        </div>
                                        <div class="contact-info-item">
                                            <div class="contact-info-icon"><i class="fa fa-usd"></i></div>
                                            <div>
                                                <h4>Cost</h4>
                                                <p>Free &mdash; no obligation</p>
                                            </div>
                                        </div>
                                    </div>

                                    <div class="contact-info-card" style="margin-top: 20px;">
                                        <div class="contact-info-item">
                                            <div class="contact-info-icon"><i class="fa fa-phone"></i></div>
                                            <div>
                                                <h4>Prefer to call?</h4>
                                                <p><a href="tel:9789928772">978-992-8772</a></p>
                                            </div>
                                        </div>
                                        <div class="contact-info-item">
                                            <div class="contact-info-icon"><i class="fa fa-envelope"></i></div>
                                            <div>
                                                <h4>Email us</h4>
                                                <p><a href="mailto:bob@plaintalkfinancial.com">bob@plaintalkfinancial.com</a></p>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
            </section>

        </section>
    </div>
<?php include $_SERVER['DOCUMENT_ROOT'] . '/includes/footer.php'; ?>

    <script type="text/javascript" src="/js/vendor/scripts.js"></script>
    <script type="text/javascript" src="/js/vendor/global-asset-scripts.js"></script>
    <script type="text/javascript" src="/js/vendor/vcard.js"></script>
<script type="text/javascript" src="/js/vendor/sections.js"></script>
<script>
  var navBtnTitle = 'Book Appointment';
  $('#mainNav .c-topnav__menu-item .c-topnav__menu-text span:contains(' + navBtnTitle + ')').parent().parent().addClass('navBtn');
</script>
<script>
(function() {
    var API = '/includes/calendly-api.php';
    var eventTypeUri = '';
    var eventDuration = 30;
    var availableSlots = {}; // { 'YYYY-MM-DD': [ { start_time, display } ] }
    var selectedDate = null;
    var selectedSlot = null;
    var currentMonth = new Date();
    var today = new Date();
    today.setHours(0,0,0,0);
    var userTimezone = Intl.DateTimeFormat().resolvedOptions().timeZone || 'America/New_York';

    var $loading = document.getElementById('apptLoading');
    var $calendar = document.getElementById('apptCalendar');
    var $calGrid = document.getElementById('calGrid');
    var $calMonthYear = document.getElementById('calMonthYear');
    var $times = document.getElementById('apptTimes');
    var $timesGrid = document.getElementById('apptTimesGrid');
    var $timesDate = document.getElementById('apptTimesDate');
    var $error = document.getElementById('apptError');
    var $step1 = document.getElementById('apptStep1');
    var $step2 = document.getElementById('apptStep2');
    var $step3 = document.getElementById('apptStep3');
    var $summaryText = document.getElementById('apptSummaryText');
    var $confDetails = document.getElementById('apptConfDetails');
    var $confLinks = document.getElementById('apptConfLinks');

    function showError(msg) {
        $error.textContent = msg;
        $error.classList.add('visible');
    }
    function hideError() {
        $error.classList.remove('visible');
    }

    function setStep(n) {
        var steps = document.querySelectorAll('.appt-step');
        steps.forEach(function(s) {
            var sn = parseInt(s.getAttribute('data-step'));
            s.classList.remove('active', 'completed');
            if (sn < n) s.classList.add('completed');
            if (sn === n) s.classList.add('active');
        });
        $step1.style.display = n === 1 ? '' : 'none';
        $step2.classList.toggle('visible', n === 2);
        $step3.classList.toggle('visible', n === 3);
        if (n === 1) {
            $step2.classList.remove('visible');
            $step3.classList.remove('visible');
        }
    }

    function apiCall(data) {
        return fetch(API, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        }).then(function(r) { return r.json(); });
    }

    // Initialize: get event type
    function init() {
        apiCall({ action: 'get_event_type' }).then(function(data) {
            if (data.error) {
                $loading.style.display = 'none';
                showError(data.error);
                return;
            }
            eventTypeUri = data.event_type;
            eventDuration = data.duration || 30;
            loadMonth(currentMonth);
        }).catch(function() {
            $loading.style.display = 'none';
            showError('Unable to connect to scheduling service. Please call us at 978-992-8772.');
        });
    }

    // Load available times for a month (requires multiple 7-day API calls)
    function loadMonth(monthDate) {
        $loading.style.display = '';
        $calendar.style.display = 'none';
        $times.classList.remove('visible');
        hideError();

        var year = monthDate.getFullYear();
        var month = monthDate.getMonth();
        var start = new Date(year, month, 1);
        var end = new Date(year, month + 1, 0, 23, 59, 59);

        // Don't allow fetching past months
        if (end < today) {
            $loading.style.display = 'none';
            renderCalendar(monthDate);
            return;
        }
        if (start < today) start = new Date();

        // Break into 7-day chunks
        var chunks = [];
        var d = new Date(start);
        while (d <= end) {
            var chunkEnd = new Date(d);
            chunkEnd.setDate(chunkEnd.getDate() + 6);
            chunkEnd.setHours(23, 59, 59);
            if (chunkEnd > end) chunkEnd = new Date(end);
            chunks.push({
                start: d.toISOString(),
                end: chunkEnd.toISOString()
            });
            d = new Date(chunkEnd);
            d.setDate(d.getDate() + 1);
        }

        // Clear slots for this month
        var prefix = year + '-' + String(month + 1).padStart(2, '0');
        Object.keys(availableSlots).forEach(function(k) {
            if (k.startsWith(prefix)) delete availableSlots[k];
        });

        var promises = chunks.map(function(chunk) {
            return apiCall({
                action: 'get_available_times',
                event_type: eventTypeUri,
                start_time: chunk.start,
                end_time: chunk.end
            });
        });

        Promise.all(promises).then(function(results) {
            results.forEach(function(data) {
                if (data.times) {
                    data.times.forEach(function(slot) {
                        var dt = new Date(slot.start_time);
                        var dateKey = dt.getFullYear() + '-' + String(dt.getMonth() + 1).padStart(2, '0') + '-' + String(dt.getDate()).padStart(2, '0');
                        if (!availableSlots[dateKey]) availableSlots[dateKey] = [];
                        availableSlots[dateKey].push({
                            start_time: slot.start_time,
                            display: dt.toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' })
                        });
                    });
                }
            });
            $loading.style.display = 'none';
            renderCalendar(monthDate);
        }).catch(function() {
            $loading.style.display = 'none';
            showError('Failed to load available times. Please try again.');
        });
    }

    function renderCalendar(monthDate) {
        $calendar.style.display = '';
        var year = monthDate.getFullYear();
        var month = monthDate.getMonth();
        var monthNames = ['January','February','March','April','May','June','July','August','September','October','November','December'];
        $calMonthYear.textContent = monthNames[month] + ' ' + year;

        // Disable prev if current month
        var nowMonth = new Date();
        document.getElementById('calPrev').disabled = (year === nowMonth.getFullYear() && month === nowMonth.getMonth());

        // Build grid
        $calGrid.innerHTML = '';
        var dows = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'];
        dows.forEach(function(d) {
            var el = document.createElement('div');
            el.className = 'appt-cal-dow';
            el.textContent = d;
            $calGrid.appendChild(el);
        });

        var firstDay = new Date(year, month, 1).getDay();
        var daysInMonth = new Date(year, month + 1, 0).getDate();

        // Empty cells before first day
        for (var i = 0; i < firstDay; i++) {
            var empty = document.createElement('div');
            empty.className = 'appt-cal-day';
            $calGrid.appendChild(empty);
        }

        for (var d = 1; d <= daysInMonth; d++) {
            var el = document.createElement('div');
            el.className = 'appt-cal-day';
            el.textContent = d;
            var dateKey = year + '-' + String(month + 1).padStart(2, '0') + '-' + String(d).padStart(2, '0');
            var thisDate = new Date(year, month, d);

            if (thisDate.getFullYear() === today.getFullYear() && thisDate.getMonth() === today.getMonth() && thisDate.getDate() === today.getDate()) {
                el.classList.add('today');
            }

            if (availableSlots[dateKey] && availableSlots[dateKey].length > 0) {
                el.classList.add('has-slots');
                el.setAttribute('data-date', dateKey);
                el.addEventListener('click', function() {
                    var dk = this.getAttribute('data-date');
                    selectDate(dk);
                    // Highlight selected day
                    document.querySelectorAll('.appt-cal-day.selected').forEach(function(s) { s.classList.remove('selected'); });
                    this.classList.add('selected');
                });
            }

            if (selectedDate === dateKey) el.classList.add('selected');

            $calGrid.appendChild(el);
        }

        // Auto-select first available date if none selected
        if (!selectedDate) {
            var firstAvail = $calGrid.querySelector('.appt-cal-day.has-slots');
            if (firstAvail) {
                firstAvail.click();
            }
        }
    }

    function selectDate(dateKey) {
        selectedDate = dateKey;
        selectedSlot = null;
        var slots = availableSlots[dateKey] || [];
        var parts = dateKey.split('-');
        var d = new Date(parseInt(parts[0]), parseInt(parts[1]) - 1, parseInt(parts[2]));
        $timesDate.textContent = d.toLocaleDateString([], { weekday: 'long', month: 'long', day: 'numeric' });

        $timesGrid.innerHTML = '';
        slots.forEach(function(slot) {
            var el = document.createElement('div');
            el.className = 'appt-time-slot';
            el.textContent = slot.display;
            el.setAttribute('data-time', slot.start_time);
            el.addEventListener('click', function() {
                document.querySelectorAll('.appt-time-slot.selected').forEach(function(s) { s.classList.remove('selected'); });
                this.classList.add('selected');
                selectedSlot = slot;
                // Move to step 2 after a brief moment
                setTimeout(function() { goToStep2(); }, 200);
            });
            $timesGrid.appendChild(el);
        });

        $times.classList.add('visible');
    }

    function goToStep2() {
        if (!selectedSlot) return;
        var dt = new Date(selectedSlot.start_time);
        $summaryText.textContent = dt.toLocaleDateString([], { weekday: 'long', month: 'long', day: 'numeric' }) + ' at ' + selectedSlot.display;
        setStep(2);
    }

    // Navigation
    document.getElementById('calPrev').addEventListener('click', function() {
        currentMonth.setMonth(currentMonth.getMonth() - 1);
        loadMonth(currentMonth);
    });
    document.getElementById('calNext').addEventListener('click', function() {
        currentMonth.setMonth(currentMonth.getMonth() + 1);
        loadMonth(currentMonth);
    });

    // Change time button
    document.getElementById('apptChangeTime').addEventListener('click', function() {
        setStep(1);
        $times.classList.add('visible');
    });

    // Form submit
    document.getElementById('apptForm').addEventListener('submit', function(e) {
        e.preventDefault();
        hideError();

        // Honeypot check
        if (document.getElementById('apptAddress').value) return;

        var firstName = document.getElementById('apptFirstName').value.trim();
        var lastName = document.getElementById('apptLastName').value.trim();
        var email = document.getElementById('apptEmail').value.trim();
        var phone = document.getElementById('apptPhone').value.trim();
        var message = document.getElementById('apptMessage').value.trim();

        if (!firstName || !email) {
            showError('Please fill in all required fields.');
            return;
        }

        var btn = this.querySelector('button[type="submit"]');
        btn.disabled = true;
        btn.textContent = 'Booking...';

        apiCall({
            action: 'book',
            event_type: eventTypeUri,
            start_time: selectedSlot.start_time,
            first_name: firstName,
            last_name: lastName,
            email: email,
            phone: phone,
            message: message,
            timezone: userTimezone,
            duration: eventDuration
        }).then(function(data) {
            if (data.error) {
                showError(data.error);
                btn.disabled = false;
                btn.textContent = 'Book Appointment';
                return;
            }

            // Show confirmation
            var dt = new Date(selectedSlot.start_time);
            $confDetails.innerHTML = '<p><strong>Date:</strong> ' + dt.toLocaleDateString([], { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' }) + '</p>' +
                '<p><strong>Time:</strong> ' + selectedSlot.display + '</p>' +
                '<p><strong>Name:</strong> ' + firstName + ' ' + lastName + '</p>' +
                '<p><strong>Email:</strong> ' + email + '</p>';

            var links = '';
            if (data.reschedule_url) {
                links += '<a href="' + data.reschedule_url + '" target="_blank"><i class="fa fa-refresh"></i> Reschedule</a>';
            }
            if (data.cancel_url) {
                links += '<a href="' + data.cancel_url + '" target="_blank"><i class="fa fa-times"></i> Cancel</a>';
            }
            $confLinks.innerHTML = links;

            setStep(3);
        }).catch(function() {
            showError('Something went wrong. Please try again or call us at 978-992-8772.');
            btn.disabled = false;
            btn.textContent = 'Book Appointment';
        });
    });

    // Start
    init();
})();
</script>
</body>
</html>
