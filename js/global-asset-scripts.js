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
