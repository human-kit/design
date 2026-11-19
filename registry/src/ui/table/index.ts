import Root from './table.svelte';
import Header from './table-header.svelte';
import Head from './table-head.svelte';
import Body from './table-body.svelte';
import Footer from './table-footer.svelte';
import Row from './table-row.svelte';
import Cell from './table-cell.svelte';
import SectionRow from './table-section-row.svelte';
import Empty from './table-empty.svelte';
import Checkbox from './table-checkbox.svelte';
import { tableStyles, tableVariants } from './styles';

export {
	Root,
	Header,
	Head,
	Body,
	Footer,
	Row,
	Cell,
	SectionRow,
	Empty,
	Checkbox,
	Root as Table,
	Header as TableHeader,
	Head as TableHead,
	Body as TableBody,
	Footer as TableFooter,
	Row as TableRow,
	Cell as TableCell,
	SectionRow as TableSectionRow,
	Empty as TableEmpty,
	Checkbox as TableCheckbox,
	tableStyles,
	tableVariants
};
export type { TableSortDescriptor, TableSelectionKey } from '@human-kit/ui/table';
