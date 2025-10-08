/**
 * Headphones Website - Hamburger Menu Script
 * Author: leonard kipkoech
 * Description: Vanilla JavaScript for mobile hamburger menu functionality
 * No frameworks or libraries required
 */

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    
    // ============================================
    // CONFIGURATION & VARIABLES
    // ============================================
    
    const MOBILE_BREAKPOINT = 480; // Max width for mobile view
    const MENU_TRANSITION_DELAY = 200; // Delay before closing menu after link click
    
    // DOM Elements
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('navMenu');
    const navLinks = document.querySelectorAll('.nav-menu a[href^="#"]');
    
    // State
    let isMenuOpen = false;
    
    
    // ============================================
    // UTILITY FUNCTIONS
    // ============================================
    
    /**
     * Check if viewport is mobile size
     * @returns {boolean}
     */
    function isMobileView() {
        return window.innerWidth <= MOBILE_BREAKPOINT;
    }
    
    /**
     * Lock body scroll (prevent background scrolling when menu is open)
     */
    function lockBodyScroll() {
        document.body.style.overflow = 'hidden';
    }
    
    /**
     * Unlock body scroll
     */
    function unlockBodyScroll() {
        document.body.style.overflow = '';
    }
    
    
    // ============================================
    // MENU CONTROL FUNCTIONS
    // ============================================
    
    /**
     * Open the mobile menu
     */
    function openMenu() {
        isMenuOpen = true;
        hamburger.classList.add('active');
        navMenu.classList.add('active');
        hamburger.setAttribute('aria-expanded', 'true');
        
        if (isMobileView()) {
            lockBodyScroll();
        }
    }
    
    /**
     * Close the mobile menu
     */
    function closeMenu() {
        isMenuOpen = false;
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
        hamburger.setAttribute('aria-expanded', 'false');
        unlockBodyScroll();
    }
    
    /**
     * Toggle menu between open and closed states
     */
    function toggleMenu() {
        if (isMenuOpen) {
            closeMenu();
        } else {
            openMenu();
        }
    }
    
    
    // ============================================
    // EVENT HANDLERS
    // ============================================
    
    /**
     * Handle hamburger button click
     * @param {Event} event
     */
    function handleHamburgerClick(event) {
        event.preventDefault();
        event.stopPropagation();
        toggleMenu();
    }
    
    /**
     * Handle navigation link click
     * @param {Event} event
     */
    function handleNavLinkClick(event) {
        const targetId = event.currentTarget.getAttribute('href');
        
        // If it's an anchor link (starts with #)
        if (targetId && targetId !== '#') {
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                event.preventDefault();
                
                // Close menu first (on mobile)
                if (isMobileView() && isMenuOpen) {
                    setTimeout(function() {
                        closeMenu();
                    }, MENU_TRANSITION_DELAY);
                }
                
                // Smooth scroll to target
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        }
    }
    
    /**
     * Handle click outside menu (close menu)
     * @param {Event} event
     */
    function handleClickOutside(event) {
        if (!isMobileView() || !isMenuOpen) {
            return;
        }
        
        // Check if click is outside both menu and hamburger
        const isClickInsideMenu = navMenu.contains(event.target);
        const isClickOnHamburger = hamburger.contains(event.target);
        
        if (!isClickInsideMenu && !isClickOnHamburger) {
            closeMenu();
        }
    }
    
    /**
     * Handle keyboard events (ESC to close menu)
     * @param {KeyboardEvent} event
     */
    function handleKeyPress(event) {
        if (event.key === 'Escape' && isMenuOpen) {
            closeMenu();
            hamburger.focus(); // Return focus to button for accessibility
        }
    }
    
    /**
     * Handle window resize
     * Close menu and reset if switching to desktop view
     */
    function handleResize() {
        if (!isMobileView() && isMenuOpen) {
            closeMenu();
        }
    }
    
    
    // ============================================
    // INITIALIZATION
    // ============================================
    
    /**
     * Initialize the hamburger menu functionality
     */
    function init() {
        // Validate required elements exist
        if (!hamburger || !navMenu) {
            console.error('Error: Hamburger menu elements not found in DOM');
            return;
        }
        
        // Set initial ARIA state
        hamburger.setAttribute('aria-expanded', 'false');
        
        // Attach event listeners
        hamburger.addEventListener('click', handleHamburgerClick);
        document.addEventListener('click', handleClickOutside);
        document.addEventListener('keydown', handleKeyPress);
        window.addEventListener('resize', handleResize);
        
        // Attach event listeners to navigation links
        navLinks.forEach(function(link) {
            link.addEventListener('click', handleNavLinkClick);
        });
        
        console.log('Hamburger menu initialized successfully');
    }
    
    /**
     * Cleanup function (if needed for SPA or dynamic content)
     */
    function destroy() {
        hamburger.removeEventListener('click', handleHamburgerClick);
        document.removeEventListener('click', handleClickOutside);
        document.removeEventListener('keydown', handleKeyPress);
        window.removeEventListener('resize', handleResize);
        
        navLinks.forEach(function(link) {
            link.removeEventListener('click', handleNavLinkClick);
        });
        
        closeMenu();
        console.log('Hamburger menu destroyed');
    }
    
    
    // ============================================
    // START THE APPLICATION
    // ============================================
    
    init();
    
    
    // ============================================
    // PUBLIC API (Optional - for external access)
    // ============================================
    
    // Expose public methods if needed
    window.HamburgerMenu = {
        open: openMenu,
        close: closeMenu,
        toggle: toggleMenu,
        destroy: destroy,
        isOpen: function() { return isMenuOpen; }
    };
    
});
