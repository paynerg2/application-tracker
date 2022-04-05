export const applicationDisplayStyles = ['Card', 'List'];

export const defaultSettings: Settings = {
    isDarkMode: false,
    defaultApplicationDisplayStyle: applicationDisplayStyles[0],
};

export interface Settings {
    isDarkMode: boolean;
    defaultApplicationDisplayStyle: typeof applicationDisplayStyles[number];
}
