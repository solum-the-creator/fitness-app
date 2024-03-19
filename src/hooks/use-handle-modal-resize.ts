import { useLayoutEffect, useState } from 'react';

export const useHandleModalResize = (
    weekDay: number,
    modalRef: React.RefObject<HTMLDivElement>,
) => {
    const [isLeftSide, setIsLeftSide] = useState(weekDay % 7 !== 0);

    useLayoutEffect(() => {
        const handleResize = () => {
            if (modalRef.current) {
                const { right } = modalRef.current.getBoundingClientRect();
                const windowWidth = window.innerWidth;
                if (isLeftSide) {
                    if (right + 20 > windowWidth) {
                        setIsLeftSide(false);
                    }
                }
            }
        };
        handleResize();
        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, [isLeftSide, modalRef]);

    return { isLeftSide };
};
