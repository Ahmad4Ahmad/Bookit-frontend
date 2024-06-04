/** @type {import('tailwindcss').Config} */
export default {
    content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
    theme: 
    {
        extend: 
        {
            spacing:
            {
                "12": "50px",
                "97": "1024px"
            },
            borderRadius:
            {
                "5": "5px"
            },
            boxShadow:
            {
                "3xl": "0 0 10px -5px rgba(0, 0, 0, 0.4)",
                "4xl": "2px 4px 10px 1px rgba(201, 201, 201, 0.47)"
            },
            flex: 
            {
                "1": "1",
                "2": "2",
                "3": "3",
                "7": "7"
            },
            height:
            {
                "8vh": "80vh"
            }
        },
    },
    plugins: [],
};