            <section class="section section_SimpleText None None" style='background-color:rgba(247, 251, 250, 1);'>
                <div class="overlay"><div class="o-container c-customsection__container">
                    <div class="service-other">
                        <h3>Explore Our Other Services</h3>
                        <div class="service-other-grid">
<?php
$current = basename($_SERVER['SCRIPT_NAME'], '.php');
$services = [
    'goals' => 'Goal Setting',
    'retirement' => 'Retirement Planning',
    'investment' => 'Investment Management',
    'education' => 'Education Planning',
    'insurance' => 'Insurance Review',
    'tax' => 'Tax Strategies',
    'estate' => 'Estate Planning',
];
foreach ($services as $slug => $label) {
    $class = ($slug === $current) ? ' class="current"' : '';
    echo '                            <a href="/services/' . $slug . '"' . $class . '>' . $label . '</a>' . "\n";
}
?>
                        </div>
                    </div>
                </div></div>
            </section>
