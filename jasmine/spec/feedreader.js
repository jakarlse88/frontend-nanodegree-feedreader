
/* Run tests on DOM ready
 */
$(function() {

	describe('RSS Feeds', () => {
		/* Test allFeeds variable
         */
		it('are defined', () => {
			expect(allFeeds).toBeDefined();
			expect(allFeeds.length).not.toBe(0);
		});

		/* Tests a feed 'feed' and a property 'name' or 'url'
         */ 
		function testProperty(feed, property) {
			let propertyName = property === 'name'? feed.name : feed.url;

			expect(propertyName).toBeDefined();
			expect(propertyName).not.toBe('');
		}
        
		it('have non-empty name values defined', () => {
			for (let feed of allFeeds) {
				testProperty(feed, 'name');
			}
		});

		it('have non-empty URL defined', () => {
			for (let feed of allFeeds) {
				testProperty(feed, 'url');
			}        
		});

	});


	describe('The menu', () => {
		/* Tests that the menu element is
         * hidden by default. 
         */
		it('is hidden by default', () => expect($('body').hasClass('menu-hidden')).toBe(true));


		/* Tests that the menu changes
          * visibility when the menu icon is clicked.
          */
		it('changes visibility when the menu icon is clicked', () => {
			$('.menu-icon-link').click();
			expect($('body').hasClass('menu-hidden')).not.toBe(true);

			$('.menu-icon-link').click();
			expect($('body').hasClass('menu-hidden')).toBe(true);
		});
	})

	describe('Initial Entries', () => {
		/* Tests that when the loadFeed
         * function is called and completes its work, there is at least
         * a single .entry element within the .feed container.
         */
		beforeEach((done) => loadFeed(0, () => done()));

		it('should have at least a single entry', () => {
			expect($('.feed .entry').length).not.toBe(0);
		});
	});

	describe('New Feed Selection', () => {
		/* Test ensures that when a new feed is loaded
         * by the loadFeed function that the content actually changes.
         */ 
		let previousContent,
			newContent;

		/* Draw a sample of text before and after new feed load */
		beforeEach((done) => {
			loadFeed(0, () => {
				previousContent = $('.feed').text();
                
				loadFeed(1, () => {
					newContent = $('.feed').text();
					done();
				});
			});
		});

		it('content should change on feed change', () => 
			expect(previousContent).not.toEqual(newContent));
        
	});
}());
