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
    describe('RSS Feeds', function() {
        it('are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });

         it('check if each individual url is supplied', function() {
         for (let feed of allFeeds) {
            expect(feed.url).toBeDefined();
            expect(feed.url).toBeTruthy();
         }
      });

         it('check if each individual feed is named', function() {
            for (let feed of allFeeds) {
               expect(feed.name).toBeDefined();
               expect(feed.name).toBeTruthy();
            }
         });
    });
   
   describe('The menu', function() {
      let menuIcon;
         it('check to see if the menu is hidden', function() {
            expect($('body')).toHaveClass('menu-hidden');
         });

         it('check to ensure that the menu changes', function() {
            menuIcon = $('.menu-icon-link');
            menuIcon.click();
            expect($('body').hasClass('menu-hidden')).toBe(false);
            menuIcon.click();
            expect($('body').hasClass('menu-hidden')).toBe(true);
         });
   });
   
   describe('Initial Entries', function() {
         beforeEach(async function(done) {
            await loadFeed(0, done); // Pay attention to function parameters when testing
         });
         it('check the loadFeed function', function() {
            let entry = document.querySelectorAll('.feed .entry-link .entry');
            expect(entry.length).toBeGreaterThan(0);
         });
   });
   
   describe('New Feed Selection', function() {
      const feedMe = $(".feed").html();
      const firstfeedArray = [];
      const secondfeedArray = [];
         beforeEach(async function(done) {
            await loadFeed(0, function() {
               Array.from(feedMe).forEach(function(entry, index) {
                  firstfeedArray.push(entry, index);
               });
            });
            await loadFeed(1, done);
         });
         
         it('Check to ensure feed differentiation', function() { 
            Array.from(feedMe).forEach(function(entry, index) {
               secondfeedArray.push(entry, index);
            });
            console.log(secondfeedArray);
            console.log(firstfeedArray);
            expect(firstfeedArray === secondfeedArray).toBe(false); 
         });    
   });
}());
