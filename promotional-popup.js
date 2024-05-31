class PromotionalPopup extends HTMLElement {
    connectedCallback() {
        this.wrapper = this.querySelector('promotional-popup-wrapper');
        this.overlay = this.querySelector('promotional-popup-overlay');
        this.closeButton = this.querySelector('close-button');
        this.setPopupTimeout();
        this.addEventListeners();
    }

    setPopupTimeout() {
        window.setTimeout(() => {
            if (window.sessionStorage) {
                let nextPopup = sessionStorage.getItem("MFKCOOKIE");
                if (nextPopup > new Date().getTime()) {
                    return;
                }
                let expires = new Date().setHours(new Date().getHours() + 4);
                sessionStorage.setItem("MFKCOOKIE", expires);
            }
            this.showPopup();
        }, 3000);
    }

    showPopup() {
        this.wrapper.style.display = 'block';
        this.overlay.style.display = 'block';
    }

    hidePopup() {
        this.wrapper.style.display = 'none';
        this.overlay.style.display = 'none';
    }

    addEventListeners() {
        document.addEventListener("mouseup", (e) => this.handleDocumentMouseUp(e));
        this.closeButton.addEventListener("click", () => this.hidePopup());
    }

    handleDocumentMouseUp(e) {
        if (e.target === this.overlay || e.target === this.closeButton) {
            this.hidePopup();
        }
    }
}
customElements.define('promotional-popup', PromotionalPopup);