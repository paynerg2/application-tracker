export const applicationDisplayStyles = ['Card', 'List'];

export interface Settings {
    isDarkMode: boolean;
    defaultApplicationDisplayStyle: typeof applicationDisplayStyles[number];
}
