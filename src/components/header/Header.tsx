import cl from './Header.module.scss';
import Logo from '@components/UI/logo/Logo';
import Modal from '@components/UI/modal/Modal';
import Navigation from '@components/UI/navigation/Navigation';
import ThemeSwitch from '@components/UI/themeSwitch/ThemeSwitch';
import ButtonIcon from '@components/UI/Buttons/buttonIcon/ButtonIcon';

import { useState } from 'react';
import { blogUrl, newslettersUrl } from '@/routes/routes';
import { useActiveNav } from '@hooks/useActiveNav';

const Header = () => {
	const isBlogActive = useActiveNav(blogUrl.base, blogUrl.pagination(''));
	const [isOpenMenu, setIsOpenMenu] = useState(false);

	function handleMenuClose() {
		setIsOpenMenu(false);
	}

	function handleMenuOpen() {
		setIsOpenMenu(true);
	}

	const navigationItems = (
		<>
			<Navigation.Item to={blogUrl.base} isActive={isBlogActive} onClick={handleMenuClose}>
				Home
			</Navigation.Item>
			<Navigation.Item to={newslettersUrl} onClick={handleMenuClose}>
				Newsletters
			</Navigation.Item>
		</>
	);

	return (
		<>
			<header className={cl.header}>
				<div className="container container-full">
					<div className={cl.body}>
						<Logo />
						<div className={cl.panel}>
							<Navigation>{navigationItems}</Navigation>
							<ThemeSwitch />
						</div>
						<div className={cl.burger}>
							<ButtonIcon icon="menu" hiddenName="Menu" onClick={handleMenuOpen} />
						</div>
					</div>
				</div>
			</header>

			<Modal isOpen={isOpenMenu} onClose={handleMenuClose} aria={{ label: 'Menu' }}>
				<div className={cl.menu}>
					<div className={cl['menu-wrapper']}>
						<div className={cl['menu-logo']}>
							<Logo onClick={handleMenuClose} />
						</div>
						<div className={cl['menu-navigation']}>
							<Navigation direction="vertical">{navigationItems}</Navigation>
						</div>
						<ThemeSwitch />
						<div className={cl['menu-close']}>
							<ButtonIcon icon="close" hiddenName="Close" onClick={handleMenuClose} />
						</div>
					</div>
				</div>
			</Modal>
		</>
	);
};

export default Header;
