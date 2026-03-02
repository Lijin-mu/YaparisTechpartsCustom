export default class TechpartsPopupPosition {

    init() {
        console.log('TechpartsPopupPosition', this.el);
        this._updatePositions();

        this._registerEvents();
        this._observeChanges();
    }

    /**
     * Register resize event
     */
    _registerEvents() {
        console.log('_registerEvents', this.el);
        window.addEventListener('resize', () => {
            this._updatePositions();
        });
    }

    /**
     * Observe zoom / pan transform changes
     */
    _observeChanges() {
        console.log('_observeChanges', this.el);
        const observer = new MutationObserver(() => {
            this._updatePositions();
        });

        observer.observe(this.el, {
            attributes: true,
            subtree: true,
            attributeFilter: ['style', 'class']
        });
    }

    /**
     * Update popup left/right class based on available space
     */
    _updatePositions() {
        console.log('_updatePositions', this.el);
        const containerRect = this.el.getBoundingClientRect();

        this.el.querySelectorAll('.hotspot--popup').forEach(container => {
            console.log('Updating popup position for', container);

            if (!container) return;
            const hotspotRect = container.getBoundingClientRect();

            container.classList.remove('popup-left', 'popup-right');

            // fallback width if hidden
            let popupWidth = container.offsetWidth;

            const spaceRight = containerRect.right - hotspotRect.right;
            const spaceLeft  = hotspotRect.left - containerRect.left;

            if (spaceRight >= popupWidth) {
                container.classList.add('popup-right');
            }
            else if (spaceLeft >= popupWidth) {
                container.classList.add('popup-left');
            }
            else {
                container.classList.add('popup-right');
            }
        });
    }
}
