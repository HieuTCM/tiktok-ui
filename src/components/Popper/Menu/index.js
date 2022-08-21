import { Wrapper as PopperWrapper } from '~/components/Popper';
import MenuItems from './MenuItems';
import Header from './Header';
import styles from './Menu.module.scss';

import Tippy from '@tippyjs/react/headless';
import classNames from 'classnames/bind';
import { useState } from 'react';

const cx = classNames.bind(styles);

const defaulFn = () => {};

function Menu({ children, items = [], onChange = defaulFn }) {
    const [history, setHistory] = useState([
        {
            data: items,
        },
    ]);
    const current = history[history.length - 1];

    const renderItems = () => {
        return current.data.map((item, index) => {
            const isParent = !!item.children;
            return (
                <MenuItems
                    key={index}
                    data={item}
                    onClick={() => {
                        if (isParent) {
                            setHistory((prev) => [...prev, item.children]);
                        } else {
                            onChange(item);
                        }
                    }}
                />
            );
        });
    };
    return (
        <Tippy
            delay={[0, 700]}
            interactive={true}
            placement="bottom-end"
            render={(attrs) => (
                <div className={cx('menu-list')} tabIndex="-1" {...attrs}>
                    <PopperWrapper className={cx('menu-poper')}>
                        {history.length > 1 && (
                            <Header
                                title="Language"
                                onBack={() => {
                                    setHistory((prev) =>
                                        prev.slice(0, prev.length - 1),
                                    );
                                }}
                            />
                        )}
                        {renderItems()}
                    </PopperWrapper>
                </div>
            )}
        >
            {children}
        </Tippy>
    );
}

export default Menu;
