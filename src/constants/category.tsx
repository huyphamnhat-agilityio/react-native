import {
  ArmchairIcon,
  BedIcon,
  ChairIcon,
  LampIcon,
  StarIcon,
  TableIcon,
} from 'src/components/icons';

export const CATEGORIES = [
  {
    title: 'Popular',
    icon: <StarIcon />,
  },
  {
    title: 'Chair',
    icon: <ChairIcon />,
  },
  {
    title: 'Table',
    icon: <TableIcon />,
  },
  {
    title: 'Armchair',
    icon: <ArmchairIcon />,
  },
  {
    title: 'Bed',
    icon: <BedIcon />,
  },
  {
    title: 'Lamp',
    icon: <LampIcon />,
  },
] as const;
