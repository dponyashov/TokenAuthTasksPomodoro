export class AppConfig {
    static apiUrl = import.meta.env.VITE_BACK_URL || 'http://localhost:8080/api';

    static getApiUrl() {
        return this.apiUrl;
    }

    static toString() {
        return `
            --- Application Configuration ---
            BACK_API_URL: ${this.apiUrl}
            ---------------------------------
        `.trim();
    }

}