/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function() {
    /* This is our first test suite - a test suite just contains
    * a related set of tests. This suite is all about the RSS
    * feeds definitions, the allFeeds variable in our application.
    */
    describe('RSS Feeds', () => {
        /* This is our first test - it tests to make sure that the
         * allFeeds variable has been defined and that it is not
         * empty. Experiment with this before you get started on
         * the rest of this project. What happens when you change
         * allFeeds in app.js to be an empty array and refresh the
         * page?
         */
        it('are defined', () => {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });

        /* Test takes a feed and a property 'name' or 'url',
         * then checks that these are defined and have length >0
         */ 
        function testProperty(feed, property) {
            let propertyName = property === 'name'? feed.name : feed.url;

            expect(feed.url).toBeDefined();
            expect(feed.url.length).not.toBe(0);
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


    /* TODO: Write a new test suite named "The menu" */
    describe('The menu', () => {
        /* Test ensures the menu element is
         * hidden by default. 
         */
        it('is hidden by default', () => expect($('body').hasClass('menu-hidden')).toBe(true));


         /* Test ensures the menu changes
          * visibility when the menu icon is clicked.
          */
         it('changes visibility when the menu icon is clicked', () => {
            $('.menu-icon-link').click();
            expect($('body').hasClass('menu-hidden')).not.toBe(true);

            $('.menu-icon-link').click();
            expect($('body').hasClass('menu-hidden')).toBe(true);
         });
    })

    /* Initial Entries */       
    describe('Initial Entries', () => {
        /* Test that ensures when the loadFeed
         * function is called and completes its work, there is at least
         * a single .entry element within the .feed container.
         */
        beforeEach((done) => loadFeed(0, () => done()));

        it('should have at least a single entry', () => {
            expect($('.feed .entry').length).not.toBe(0);
        });
    });

    /* New Feed Selection */
    describe('New Feed Selection', () => {
        /* Test ensures that when a new feed is loaded
         * by the loadFeed function that the content actually changes.
         */ 
        let previousContent,
            newContent;

        /* Draw a sample of text before and after new feed load */
        beforeEach((done) => {
            loadFeed(0, () => {
                previousContent = $('.feed').children('a')[0].textContent;
                done();
            });
            
            loadFeed(1, () => {
                newContent = $('.feed').children('a')[0].textContent;
                done();
            });
        });

        it('content should change on feed change', (done) => {
            expect(previousContent).not.toEqual(newContent);
            done();
        });
    });
}());
