export const megaMenuData = [
  {
    id: 'manufacturers',
    label: 'Manufacturers',
    href: '/manufacturers',
    children: [
      {
        title: 'Top Brands',
        links: [
          { name: 'Siemens', href: '/manufacturers/siemens' },
          { name: 'Allen Bradley', href: '/manufacturers/allen-bradley' },
          { name: 'Mitsubishi', href: '/manufacturers/mitsubishi' },
          { name: 'Schneider Electric', href: '/manufacturers/schneider' },
          { name: 'ABB', href: '/manufacturers/abb' },
          { name: 'Omron', href: '/manufacturers/omron' },
        ]
      },
      {
        title: 'By Category',
        links: [
          { name: 'PLC Modules', href: '/categories/plc-modules' },
          { name: 'HMI & Displays', href: '/categories/hmi-displays' },
          { name: 'Servo Drives', href: '/categories/servo-drives' },
          { name: 'VFD & Inverters', href: '/categories/vfd-inverters' },
          { name: 'Power Supplies', href: '/categories/power-supplies' },
          { name: 'Industrial PCs', href: '/categories/industrial-pcs' },
        ]
      },
      {
        title: 'Obsolete Parts',
        links: [
          { name: 'Discontinued PLCs', href: '/obsolete/plc' },
          { name: 'Legacy Systems', href: '/obsolete/legacy' },
          { name: 'End-of-Life Parts', href: '/obsolete/eol' },
          { name: 'Rare Components', href: '/obsolete/rare' },
        ]
      },
      {
        title: 'Services',
        links: [
          { name: 'Part Sourcing', href: '/services/sourcing' },
          { name: 'Repair Services', href: '/services/repair' },
          { name: 'Technical Support', href: '/services/support' },
          { name: 'Warranty', href: '/services/warranty' },
        ]
      }
    ]
  },
  {
    id: 'products',
    label: 'Products',
    href: '/products',
    children: [
      {
        title: 'Automation',
        links: [
          { name: 'PLC Systems', href: '/products/plc' },
          { name: 'DCS Systems', href: '/products/dcs' },
          { name: 'SCADA Software', href: '/products/scada' },
        ]
      },
      {
        title: 'Motion Control',
        links: [
          { name: 'Servo Motors', href: '/products/servo-motors' },
          { name: 'Stepper Motors', href: '/products/stepper-motors' },
          { name: 'Linear Actuators', href: '/products/linear-actuators' },
        ]
      },
      {
        title: 'Networking',
        links: [
          { name: 'Industrial Ethernet', href: '/products/industrial-ethernet' },
          { name: 'Fieldbus', href: '/products/fieldbus' },
          { name: 'Wireless Solutions', href: '/products/wireless' },
        ]
      },
      {
        title: 'Sensors',
        links: [
          { name: 'Proximity Sensors', href: '/products/proximity-sensors' },
          { name: 'Vision Systems', href: '/products/vision-systems' },
          { name: 'Encoders', href: '/products/encoders' },
        ]
      }
    ]
  },
  { id: 'offers', label: 'Offers', href: '/offers' },
  { id: 'blogs', label: 'Blogs', href: '/blogs' },
  { id: 'faq', label: 'FAQ', href: '/faq' },
  { id: 'careers', label: 'Careers', href: '/careers' },
  { id: 'contact', label: 'Contact Us', href: '/contact' },
];