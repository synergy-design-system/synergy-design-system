import * as meta from '@synergy-design-system/metadata';
import { metadataStoreOptions } from '../utils/metadataStoreOptions';

const components = await meta.listComponents({}, metadataStoreOptions);
const templates = await meta.listTemplates({}, metadataStoreOptions);
const styles = await meta.listStyles({}, metadataStoreOptions);

type NavigationProps = {
	currentPath: string;
};

export default function Navigation({ currentPath }: NavigationProps) {
	return (
		<syn-side-nav variant="sticky" open>
			<syn-nav-item open={currentPath.includes('/component/')}>
				Components
				{components.data.map(c => {
					const href = `/component/${c.id.replace(/^component:/, '')}`;
					const currentProps: Record<string, string> = currentPath === href ? { current: '' } : {};

					return (
						<syn-nav-item
							{...currentProps}
							href={href}
							slot="children"
							key={c.id}
						>
							{c.name}
						</syn-nav-item>
					);
				})}
			</syn-nav-item>
			<syn-nav-item>
				Templates
				{templates.data.map(t => (
					<syn-nav-item
						disabled
						slot="children"
						key={t.id}
					>
						{t.name}
					</syn-nav-item>
				))}
			</syn-nav-item>
			<syn-nav-item>
				Styles
				{styles.data.map(s => (
					<syn-nav-item
						disabled
						slot="children"
						key={s.id}
					>
						{s.name}
					</syn-nav-item>
				))}
			</syn-nav-item>
		</syn-side-nav>
	);
}
