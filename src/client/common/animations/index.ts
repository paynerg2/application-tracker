const pageTransitionVariants = {
    enter: {
        opacity: 0,
    },
    center: {
        opacity: 1,
    },
    exit: {
        opacity: 0,
    },
};

export const pageTransitionProps = {
    variants: pageTransitionVariants,
    initial: 'enter',
    animate: 'center',
    exit: 'exit',
    transition: {
        opacity: { duration: 0.2 },
    },
    when: 'afterChildren',
};
