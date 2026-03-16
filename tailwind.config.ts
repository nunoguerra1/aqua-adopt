import type { Config } from "tailwindcss";

const config: Config = {
    theme: {
        extend: {
            colors: {
                ocean: {
                    50: '#f0f9ff',
                    100: '#e0f2fe',
                    200: '#bae6fd',
                    300: '#7dd3fc',
                    400: '#38bdf8',
                    500: '#0ea5e9',
                    600: '#0284c7',
                    700: '#0369a1',
                    800: '#075985',
                    900: '#0c4a6e',
                },
                sand: {
                    50: '#fdf8f1',
                    100: '#fbf1e3',
                    200: '#f7e3c7',
                    300: '#f3d5ab',
                    400: '#efc78f',
                },
                coral: {
                    500: '#ff7f50',
                    600: '#ff6347',
                }
            },
            backgroundImage: {
                'polynesian-pattern': "url('/images/pattern.png')",
            },
        },
    },
};
export default config;