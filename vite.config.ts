import path from 'path';

import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

export default defineConfig(({ command }) => ({
    base: command === 'build' ? '/solum-the-creator/' : '/',
    plugins: [react()],
    server: {
        host: true,
        port: 3000,
    },
    css: {
        preprocessorOptions: {
            less: {
                modifyVars: {
                    'primary-color': '#2f54eb',
                    'primary-color-hover': '#597ef7',
                    'heading-color': '#262626',
                    'layout-body-background': '#ffffff',
                    'font-family': '"Inter", sans-serif',
                    'text-color': '#262626',
                    'text-color-secondary': '#8c8c8c',
                    'typography-title-margin-top': '0px',
                    'typography-title-margin-bottom': '0px',
                    'typography-title-font-weight': '500',
                    'input-padding-horizontal': '12px',
                    'input-padding-vertical-lg': '10px',
                    'font-size-lg': '14px',
                    'line-height-base': '1.3',
                },
                javascriptEnabled: true,
            },
        },
    },
    resolve: {
        alias: {
            '@public': path.resolve(__dirname, 'public'),
            '@components': path.resolve(__dirname, 'src/components'),
            '@constants': path.resolve(__dirname, 'src/constants'),
            '@hooks': path.resolve(__dirname, 'src/hooks'),
            '@pages': path.resolve(__dirname, 'src/pages'),
            '@redux': path.resolve(__dirname, 'src/redux'),
            '@types': path.resolve(__dirname, 'src/types'),
            '@utils': path.resolve(__dirname, 'src/utils'),
        },
    },
}));
