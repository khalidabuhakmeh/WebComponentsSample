export class Counter extends HTMLElement {
    static observedAttributes = ["count", "href"]
    
    /* lifecycle events */
    connectedCallback() {
        console.log('created');
        this.$button.addEventListener("click", this.increment)
    }

    disconnectedCallback() {
        console.log('destroyed');
        this.$button.removeEventListener("click", this.increment)
    }

    attributeChangedCallback(name, oldValue, newValue) {
        if (name === "count") {
            this.$figure.innerHTML = `${this.#count}`;
        }
    }

    increment = () => {
        this.$button.disabled = true;

        let formData = new URLSearchParams();
        formData.append("count", this.#count);

        fetch(this.#href, {
           method: 'POST',
           headers: {
               'Content-Type': 'application/x-www-form-urlencoded'
           },
           body: formData
        }).then((response) => {
            return response.text();
        }).then((data) => {
            this.#count = parseInt(data);
            this.$button.disabled = false;
            console.log('clicked', this.#count);
        });
    }
    get $button() {
        return this.querySelector("button");
    }

    get $figure() {
        return this.querySelector('[role="figure"]');
    }

    get #count() {
        return parseInt(this.getAttribute("count"));
    }

    set #count(value) {
        this.setAttribute("count", value.toString());
    }
    
    get #href() {
        return this.getAttribute("href");
    }
}