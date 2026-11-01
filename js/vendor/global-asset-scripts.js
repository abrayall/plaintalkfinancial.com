/**
 * FAQ JSON-LD Schema Generator
 *
 * This script automatically extracts FAQ questions and answers from web pages
 * and generates JSON-LD schema for FAQPage to be added to the head of the document.
 *
 */

(function () {
	/**
	 * Determines if a heading element is likely a question based on its content
	 * @param {Element} element The heading element to check
	 * @returns {boolean} True if the element appears to be a question
	 */
	function isQuestion(element) {
		const text = element.textContent.trim().toLowerCase();

		// Check if it ends with a question mark
		if (text.endsWith('?')) return true;

		// Check if it starts with common question words
		const questionStarters = [
			'how',
			'what',
			'when',
			'where',
			'why',
			'who',
			'which',
			'do',
			'does',
			'can',
			'could',
			'should',
			'would',
			'will',
			'is',
			'are',
		];
		const firstWord = text.split(' ')[0];

		return questionStarters.includes(firstWord);
	}

	/**
	 * Collects all content elements between a question and the next question or end of section
	 * @param {Element} questionElement The question heading element
	 * @param {Array} allHeadings All heading elements in the section
	 * @returns {string} Combined HTML content of the answer
	 */
	function collectAnswerContent(questionElement, allHeadings) {
		let answerHTML = '';
		let currentElement = questionElement.nextElementSibling;

		// Find the next question heading to know where to stop
		const currentIndex = allHeadings.indexOf(questionElement);
		const nextQuestionElement = allHeadings[currentIndex + 1] || null;

		// Collect all elements until we reach the next question or end of section
		while (currentElement && currentElement !== nextQuestionElement) {
			// Include various content types in the answer
			if (['P', 'UL', 'OL', 'DIV', 'IMG', 'H4', 'H5', 'H6', 'BLOCKQUOTE'].includes(currentElement.tagName)) {
				answerHTML += currentElement.outerHTML;
			}
			currentElement = currentElement.nextElementSibling;
		}

		return answerHTML.trim();
	}

	/**
	 * Collects answer content for paragraph-based questions
	 * @param {Element} questionElement The question paragraph element
	 * @param {Array} paragraphs All paragraph elements in the section
	 * @returns {string} Combined HTML content of the answer
	 */
	function collectParagraphAnswerContent(questionElement, paragraphs) {
		let answerHTML = '';
		let currentElement = questionElement.nextElementSibling;

		// Collect elements until we hit another question paragraph or run out of siblings
		while (currentElement) {
			// Include various content types in the answer
			if (['P', 'UL', 'OL', 'DIV', 'IMG', 'H4', 'H5', 'H6', 'BLOCKQUOTE'].includes(currentElement.tagName)) {
				// Stop if this paragraph is also a question
				if (currentElement.tagName === 'P' && isQuestion(currentElement)) {
					break;
				}
				answerHTML += currentElement.outerHTML;
			}
			// Also stop if we hit a heading (could be start of new section)
			else if (['H1', 'H2', 'H3'].includes(currentElement.tagName)) {
				break;
			}

			currentElement = currentElement.nextElementSibling;
		}

		return answerHTML.trim();
	}

	/**
	 * Extracts FAQ questions and answers from the page based on the website structure
	 * @returns {Array} Array of objects with question and answer properties
	 */
	function extractFAQs() {
		let faqs = [];

		try {
			// Find all dev-faq sections (the main containers for FAQs on the site)
			const faqSections = document.querySelectorAll('.dev-ds_faq');

			if (faqSections.length > 0) {
				// Process each FAQ section
				faqSections.forEach((section) => {
					// First, process heading-based questions (h2, h3)
					const headings = Array.from(section.querySelectorAll('h2, h3'));
					const questionHeadings = headings.filter((heading) => isQuestion(heading));

					questionHeadings.forEach((questionElem) => {
						const questionText = questionElem.textContent.trim();
						const answerContent = collectAnswerContent(questionElem, headings);

						if (answerContent && answerContent.length > 0) {
							faqs.push({
								question: questionText,
								answer: answerContent,
							});
						}
					});

					// Then, process paragraph-based questions
					const paragraphs = Array.from(section.querySelectorAll('p'));
					const questionParagraphs = paragraphs.filter((p) => isQuestion(p));

					questionParagraphs.forEach((questionElem) => {
						const questionText = questionElem.textContent.trim();
						const answerContent = collectParagraphAnswerContent(questionElem, paragraphs);

						if (answerContent && answerContent.length > 0) {
							faqs.push({
								question: questionText,
								answer: answerContent,
							});
						}
					});
				});
			}
		} catch (error) {
			console.error('Error extracting FAQs:', error);
		}

		return faqs;
	}

	/**
	 * Generates JSON-LD schema from FAQ data
	 * @param {Array} faqs Array of FAQ objects
	 * @returns {string} JSON-LD schema string
	 */
	function generateJSONLD(faqs) {
		if (!faqs || faqs.length === 0) {
			// console.error('No FAQs found on the page');
			return null;
		}

		const schema = {
			'@context': 'https://schema.org',
			'@type': 'FAQPage',
			mainEntity: faqs.map((faq) => ({
				'@type': 'Question',
				name: faq.question,
				acceptedAnswer: {
					'@type': 'Answer',
					text: faq.answer,
				},
			})),
		};

		return JSON.stringify(schema, null, 2);
	}

	/**
	 * Injects JSON-LD schema into the page head
	 * @param {string} jsonld JSON-LD schema string
	 */
	function injectJSONLD(jsonld) {
		if (!jsonld) return;

		const script = document.createElement('script');
		script.type = 'application/ld+json';
		script.textContent = jsonld;

		document.head.appendChild(script);
		// console.log('FAQ JSON-LD schema successfully added to page');
	}

	/**
	 * Main function to generate and inject FAQPage schema
	 */
	function generateFAQSchema() {
		const faqs = extractFAQs();

		if (faqs.length === 0) {
			// console.error('No FAQs found on the page. Check the HTML structure.');
			return;
		}

		// console.log(`Found ${faqs.length} FAQs on the page`);

		const jsonld = generateJSONLD(faqs);
		injectJSONLD(jsonld);

		// Return the generated schema for debugging
		return jsonld;
	}

	// Run the script once the DOM is fully loaded
	if (document.readyState === 'loading') {
		document.addEventListener('DOMContentLoaded', generateFAQSchema);
	} else {
		generateFAQSchema();
	}

	// Expose function for manual execution if needed
	// window.generateFAQSchema = generateFAQSchema;
})();


/**
 * Redirect URL Query String Handler
 *
 * Checks the current page URL for a `?redirectUrl=` query parameter and, if
 * found, matches the value against a predefined map of legacy paths to their
 * updated destinations. When a match is found the visitor is seamlessly
 * redirected to the new path.
 *
 */
(function () {
	const params = new URLSearchParams(window.location.search);
	const redirectUrl = params.get('redirectUrl');

	if (!redirectUrl) return;

	// Split the redirectUrl value into its path and query-string pieces
	const [rawPath, rawQuery = ''] = redirectUrl.split('?');

	// Find the "/resource-center" segment, ignoring any prefix
	// (double slashes, subdomain-style paths, etc.)
	const match = rawPath.match(/\/resource-center\/.+/);
	if (!match) return;

	// Normalize by removing any trailing slash and lowercasing.
	// Case is handled server-side, but normalizing here avoids an extra
	// redirect hop when a mixed-case URL slips through.
	const normalizedPath = match[0].replace(/\/$/, '').toLowerCase();

	// Paths that map to themselves are intentionally omitted — the loop guard
	// would skip them anyway, so listing them adds no functional value.
	const redirectMap = {
		// estate
		'/resource-center/estate/what-is-my-life-expectancy': '/resource-center/retirement/how-much-do-i-need-to-retire',
		'/resource-center/estate/whats-is-my-current-net-worth': '/resource-center/investment/what-is-my-net-worth',
		'/resource-center/estate/whats-my-potential-estate-tax': '/resource-center/tax/federal-capital-gains-tax-estimator',
		// insurance
		'/resource-center/insurance/assess-your-life-insurance-needs':'/resource-center/retirement/assess-your-life-insurance-needs-1',
		'/resource-center/insurance/lifetime-of-earnings': '/resource-center/money/lifetime-of-earnings-1',
		'/resource-center/insurance/long-term-care-needs': '/resource-center/insurance/long-term-care-needs-1',
		// investment
		'/resource-center/investment/how-compound-interest-works':'/resource-center/investment/how-compound-interest-works-1',
		'/resource-center/investment/impact-of-taxes-and-inflation': '/resource-center/investment/taxable-vs-tax-deferred-savings-1',
		'/resource-center/investment/saving-for-college': '/resource-center/investment/college-savings',
		'/resource-center/investment/taxable-vs-tax-deferred-savings': '/resource-center/investment/taxable-vs-tax-deferred-savings-1',
		'/resource-center/investment/what-is-the-dividend-yield':	'/resource-center/investment/what-is-the-dividend-yield-1',
		// lifestyle
		'/resource-center/lifestyle/bi-weekly-payments': '/resource-center/investment/bi-weekly-mortgage-payments',
		'/resource-center/lifestyle/can-i-refinance-my-mortgage': '/resource-center/estate/comparing-mortgage-terms-1',
		'/resource-center/lifestyle/comparing-mortgage-terms': '/resource-center/estate/comparing-mortgage-terms-1',
		'/resource-center/lifestyle/how-much-home-can-i-afford': '/resource-center/lifestyle/how-much-home-can-i-afford-1',
		'/resource-center/lifestyle/interested-in-a-fuel-efficient-car': '/resource-center/lifestyle/whats-your-mpg',
		'/resource-center/lifestyle/should-i-buy-or-lease-an-auto': '/resource-center/lifestyle/should-i-buy-or-lease-an-auto-1',
		'/resource-center/lifestyle/should-i-pay-off-debt-or-invest': '/resource-center/investment/debt-vs-investment',
		// money
		'/resource-center/money/historical-inflation': '/resource-center/money/historical-inflation-1',
		'/resource-center/money/paying-off-a-credit-card': '/resource-center/money/credit-card-payoff',
		// retirement
		'/resource-center/retirement/annuity-comparison': '/resource-center/retirement/annuity-comparison-1',
		'/resource-center/retirement/estimate-your-rmd': '/resource-center/retirement/estimate-your-rmd-1',
		'/resource-center/retirement/inflation-and-retirement': '/resource-center/retirement/inflation-retirement',
		'/resource-center/retirement/my-retirement-savings': '/resource-center/retirement/my-retirement-savings-1',
		'/resource-center/retirement/potential-income-from-an-ira': '/resource-center/retirement/ira-income',
		'/resource-center/retirement/roth-401k-vs-traditional-401k': '/resource-center/retirement/roth-401k-vs-traditional-401k-1',
		'/resource-center/retirement/self-employed-retirement-plans': '/resource-center/retirement/my-retirement-savings-1',
		// tax
		'/resource-center/tax/capital-gains-tax-estimator': '/resource-center/tax/federal-capital-gains-tax-estimator',
		'/resource-center/tax/comparing-investments': '/resource-center/investment/comparing-investments-1',
		'/resource-center/tax/federal-income-tax': '/resource-center/tax/federal-capital-gains-tax-estimator',
		'/resource-center/tax/home-mortgage-deduction': '/resource-center/estate/comparing-mortgage-terms-1',
		'/resource-center/tax/social-security-taxes': '/resource-center/tax/social-security-tax-estimator',
		'/resource-center/tax/tax-freedom-day': '/resource-center/tax/federal-capital-gains-tax-estimator',
	};

	const destination = redirectMap[normalizedPath];

	if (!destination) return;
	if (normalizedPath === destination) return;

	// Merge query params from the original page URL and the redirectUrl value,
	// excluding `redirectUrl` itself. Params from the redirectUrl value take
	// precedence on key collision.
	const mergedParams = new URLSearchParams();
	params.forEach((value, key) => {
		if (key !== 'redirectUrl') mergedParams.set(key, value);
	});
	new URLSearchParams(rawQuery).forEach((value, key) => {
		mergedParams.set(key, value);
	});

	const queryString = mergedParams.toString();
	const finalUrl = queryString ? `${destination}?${queryString}` : destination;

	window.location.replace(finalUrl);
})();
