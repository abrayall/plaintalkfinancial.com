<footer class="site-footer">
    <div class="site-footer__main">
        <div class="site-footer__grid">
            <div class="site-footer__brand">
                <a href="/" class="site-footer__logo">
                    <img src="/images/logo-white.png" alt="Plain Talk Financial Planning" />
                    <span class="site-footer__logo-text">
                        <span class="site-footer__logo-name">Plain Talk</span>
                        <span class="site-footer__logo-tagline">Financial Planning</span>
                    </span>
                </a>
                <p class="site-footer__blurb">Independent, fee-only financial planning in your best interest. No commissions. No conflicts. Just honest guidance.</p>
                <div class="site-footer__social">
                    <a href="https://www.linkedin.com/in/bobfoster63" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn"><i class="fa fa-linkedin" aria-hidden="true"></i></a>
                </div>
            </div>
            <div class="site-footer__col">
                <h4>Services</h4>
                <ul>
                    <li><a href="/services/goals">Goal Setting</a></li>
                    <li><a href="/services/retirement">Retirement Planning</a></li>
                    <li><a href="/services/investment">Investment Management</a></li>
                    <li><a href="/services/education">Education Planning</a></li>
                    <li><a href="/services/insurance">Insurance Review</a></li>
                    <li><a href="/services/tax">Tax Strategies</a></li>
                    <li><a href="/services/estate">Estate Planning</a></li>
                </ul>
            </div>
            <div class="site-footer__col">
                <h4>Company</h4>
                <ul>
                    <li><a href="/about">About Us</a></li>
                    <li><a href="/process">Our Process</a></li>
                    <!-- <li><a href="/resources">Resources</a></li> -->
                    <li><a href="/appointment">Book Appointment</a></li>
                    <li><a href="/contact">Contact</a></li>
                </ul>
            </div>
            <div class="site-footer__col">
                <h4>Contact</h4>
                <ul class="site-footer__contact-list">
                    <li><i class="fa fa-phone"></i> <a href="tel:9789928772">978-992-8772</a></li>
                    <li><i class="fa fa-envelope"></i> <a href="mailto:bob@plaintalkfinancial.com">bob@plaintalkfinancial.com</a></li>
                    <li><i class="fa fa-map-marker"></i> 14 Sanborn Terrace<br>Amesbury, MA 01913</li>
                </ul>
            </div>
        </div>
    </div>
    <div class="site-footer__disclosure">
        <div class="site-footer__disclosure-inner">
            <p>Advisory services are offered through Plain Talk Financial Planning, LLC, an investment adviser registered with the State of Massachusetts. Advisory services are only offered to clients or prospective clients where Plain Talk Financial Planning, LLC and its representatives are properly registered or exempt from registration.</p>
            <p>The information on this site is not intended as tax, accounting or legal advice, nor is it an offer or solicitation to buy or sell, or as an endorsement of any company, security, fund, or other offering. Information provided should not be solely relied upon for decision making. Investments involve risk and have the potential for complete loss.</p>
            <div class="site-footer__legal-links">
                <a href="/documents/PTFP-Privacy-Policy.pdf" target="_blank" rel="noopener">Privacy Policy</a>
                <a href="/documents/PTFP-ADV-Part-2A-2B.pdf" target="_blank" rel="noopener">ADV Part 2</a>
                <a href="/documents/PTFP-Fee-Table.pdf" target="_blank" rel="noopener">Our Fees</a>
            </div>
        </div>
    </div>
    <div class="site-footer__bottom">
        <div class="site-footer__bottom-inner">
            <?php
                $versionFile = $_SERVER['DOCUMENT_ROOT'] . '/version.properties';
                $version = 'latest';
                if (file_exists($versionFile)) {
                    $props = parse_ini_file($versionFile);
                    $version = $props['version'] ?? 'latest';
                }
            ?>
            <p style="display: flex; justify-content: space-between; align-items: center;">&copy; <?php echo date('Y'); ?> Plain Talk Financial Planning, LLC. All rights reserved. <span style="font-size: 0.75em; color: #777;">v<?php echo htmlspecialchars($version); ?></span></p>
        </div>
    </div>
</footer>
<script>
document.addEventListener('DOMContentLoaded', function() {
    document.querySelectorAll('form.contactForm').forEach(function(form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            var loading = form.querySelector('.loading');
            var success = form.querySelector('.formSuccess');
            var error = form.querySelector('.formError');
            var submit = form.querySelector('[type="submit"]');
            if (loading) loading.style.display = 'inline-block';
            if (success) success.style.display = 'none';
            if (error) error.style.display = 'none';
            if (submit) submit.disabled = true;
            fetch(form.action, {
                method: 'POST',
                body: new FormData(form),
                headers: { 'Accept': 'application/json' }
            }).then(function(res) { return res.json().then(function(data) { return { ok: res.ok, data: data }; }); })
            .then(function(result) {
                if (loading) loading.style.display = 'none';
                if (result.ok && result.data.ok) {
                    if (success) success.style.display = 'block';
                    form.reset();
                } else {
                    if (error) error.style.display = 'block';
                }
                if (submit) submit.disabled = false;
            }).catch(function() {
                if (loading) loading.style.display = 'none';
                if (error) error.style.display = 'block';
                if (submit) submit.disabled = false;
            });
        });
    });
});
</script>
