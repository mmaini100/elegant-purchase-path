import React, { useState, useEffect } from 'react';
import ProductCard from '../components/ProductCard';
import { useSearch } from '../contexts/SearchContext';

const data = {
  Watches: [
    { id: 'w1', name: 'Luxury Watch Collection', price: 108299, image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=500&h=500' },
    { id: 'w2', name: 'Classic Analog Watch', price: 8999, image: 'https://images.unsplash.com/photo-1557531365-e8b22d93dbd0?q=80&w=764&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' },
    { id: 'w3', name: 'Smart Fitness Watch', price: 11999, image: 'https://plus.unsplash.com/premium_photo-1681504446264-708b83f4ea12?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' },
    { id: 'w4', name: 'Luxury Gold Watch', price: 159999, image: 'https://images.unsplash.com/photo-1533139502658-0198f920d8e8?q=80&w=742&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' },
    { id: 'w5', name: 'Casual Sports Watch', price: 4999, image: 'https://images.unsplash.com/photo-1587400519568-1fe0329bfb2e?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' },
    { id: 'w6', name: 'Digital Retro Watch', price: 2499, image: 'https://images.unsplash.com/photo-1703316805113-8e5e2d134b2f?q=80&w=1171&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' }
  ],

  Lamps: [
    { id: 'l1', name: 'Smart LED Lamp', price: 8499, image: 'https://images.unsplash.com/photo-1571406487954-dc11b0c0767d?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' },
    { id: 'l2', name: 'Vintage Desk Lamp', price: 3499, image: 'https://images.unsplash.com/photo-1661865779397-995546488797?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' },
    { id: 'l3', name: 'Minimalist Floor Lamp', price: 6999, image: 'https://images.unsplash.com/photo-1673939859210-23d8444237ff?q=80&w=700&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' },
    { id: 'l4', name: 'Touch Sensor Lamp', price: 5999, image: 'https://images.unsplash.com/photo-1638813066524-ff2e04f9e904?q=80&w=735&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' },
    { id: 'l5', name: 'Decorative Table Lamp', price: 2999, image: 'https://images.unsplash.com/photo-1551380701-5dd33d5b5d06?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' },
    { id: 'l6', name: 'Reading Night Lamp', price: 2199, image: 'https://images.unsplash.com/photo-1580148846653-b5523e6dfc44?q=80&w=735&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' }
  ],

  Bags: [
    { id: 'b1', name: 'Designer Leather Bag', price: 49999, image: 'https://images.unsplash.com/photo-1682316967717-16b32a406559?q=80&w=735&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' },
    { id: 'b2', name: 'Minimalist Backpack', price: 3299, image: 'https://images.unsplash.com/photo-1591534577302-1696205bb2bc?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' },
    { id: 'b3', name: 'Gym Duffel Bag', price: 2799, image: 'https://images.unsplash.com/photo-1601758680428-25802cf0466f?q=80&w=627&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' },
    { id: 'b4', name: 'Travel Trolley Bag', price: 8999, image: 'https://plus.unsplash.com/premium_photo-1679046361409-a29d19792e08?q=80&w=627&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' },
    { id: 'b5', name: 'Shoulder Sling Bag', price: 1599, image: 'https://images.unsplash.com/photo-1742548473532-f814646349f9?q=80&w=880&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' },
    { id: 'b6', name: 'Canvas Tote Bag', price: 799, image: 'https://plus.unsplash.com/premium_photo-1693242804614-5d3955b1fb7b?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' }
  ],

  Mattresses: [
    { id: 'm1', name: 'Memory Foam Mattress', price: 17999, image: 'https://images.unsplash.com/photo-1559317030-5662dee0c59c?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' },
    { id: 'm2', name: 'Spring Bed Mattress', price: 9999, image: 'https://images.unsplash.com/photo-1613940512699-fc9150817bb2?q=80&w=735&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' },
    { id: 'm3', name: 'Hybrid King Mattress', price: 22999, image: 'https://images.unsplash.com/photo-1742319096912-7bb94fdfeb03?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' },
    { id: 'm4', name: 'Single Foldable Mattress', price: 4999, image: 'https://media.istockphoto.com/id/1028122536/photo/sofa-bed-structure.jpg?s=1024x1024&w=is&k=20&c=ZYEQcac53KwSenWb_17QJys60ffKU91ssN7P4Y95IsQ=' },
    { id: 'm5', name: 'Luxury Latex Mattress', price: 27999, image: 'https://media.istockphoto.com/id/185083188/photo/luxury-shangri-la-hotel-room.webp?a=1&b=1&s=612x612&w=0&k=20&c=pJs1KNBcI5hpaLMydDTYa-tvw1TbPIYO8UtEEraMN78=' },
    { id: 'm6', name: 'Budget Foam Mattress', price: 3499, image: 'https://media.istockphoto.com/id/1214065873/photo/comfortable-mattress-isolated-on-white-background-orthopedic-mattress.webp?a=1&b=1&s=612x612&w=0&k=20&c=Wh9WR5QF0xrQ4u5P5cdjcqBe6hP0v5ZjpcLBOl09n1k=' }
  ],

  Clothes: [
    { id: 'c1', name: 'Casual White Shirt', price: 2299, image: 'https://media.istockphoto.com/id/1201029095/photo/handsome-man-sitting-on-old-classic-scooter.webp?a=1&b=1&s=612x612&w=0&k=20&c=XGFmtBQM4fGidvSIkA_otnxjTUuOJd_JrRXxiEh2Dcc=' },
    { id: 'c2', name: 'Slim Fit Jeans', price: 1899, image: 'https://media.istockphoto.com/id/1079671496/photo/slim-woman-cropped-t-shirt-high-waist-denim.webp?a=1&b=1&s=612x612&w=0&k=20&c=Eg8CpJvT8ybISdeDTz5ThYOs0D0HKbXeNWHnAwriLrk=' },
    { id: 'c3', name: 'Formal Blazer', price: 4499, image: 'https://images.unsplash.com/photo-1723063640943-2b7b4379e1ee?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8Zm9ybWFsJTIwYmxhemVyfGVufDB8fDB8fHww' },
    { id: 'c4', name: 'Oversized Hoodie', price: 1999, image: 'https://media.istockphoto.com/id/1354548113/photo/blank-hooded-sweatshirt-mockup-with-zipper-in-front-side-and-back-views.webp?a=1&b=1&s=612x612&w=0&k=20&c=TF0FF1GVEHfrzqFufDPXGniZ_E3LBnyhkZVRck9M9yc=' },
    { id: 'c5', name: 'Printed Summer Dress', price: 1499, image: 'https://plus.unsplash.com/premium_photo-1723914108893-ac3047a4f1df?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8cHJpbnRlZCUyMHN1bW1lciUyMGRyZXNzfGVufDB8fDB8fHww' },
    { id: 'c6', name: 'Athleisure Joggers', price: 1199, image: 'https://media.istockphoto.com/id/2053695560/photo/active-young-woman-jogging-in-urban-environment-fitness-and-healthy-lifestyle-concept.webp?a=1&b=1&s=612x612&w=0&k=20&c=VPdYcRUxY2dJYriqODZRBJcj2xy9nXUZbs7wB6SM1Xs=' }
  ],

  Shoes: [
    { id: 's1', name: 'Running Shoes', price: 3299, image: 'https://images.unsplash.com/photo-1597892657493-6847b9640bac?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cnVubmluZyUyMHNob2VzfGVufDB8fDB8fHww' },
    { id: 's2', name: 'Leather Formal Shoes', price: 4499, image: 'https://media.istockphoto.com/id/1253001530/photo/indian-made-mens-leather-shoes-with-box.webp?a=1&b=1&s=612x612&w=0&k=20&c=xsdqm8t88PVu3GIrBlBm9bzpC3EyTrI5t79BjmFXBlY=' },
    { id: 's3', name: 'Slip-on Loafers', price: 2599, image: 'https://media.istockphoto.com/id/886450422/photo/person-standing-on-sidewalk-in-a-rainy-day-autumn.webp?a=1&b=1&s=612x612&w=0&k=20&c=2W_VcW1omhpU5i5nPNnpH536Qpdpx5cDw7aaAUc0YO4=' },
    { id: 's4', name: 'Canvas Sneakers', price: 1999, image: 'https://media.istockphoto.com/id/175537625/photo/sneakers-with-clipping-path.webp?a=1&b=1&s=612x612&w=0&k=20&c=M8EnaihnverZmhCx8vvFA7gRV-Vmpf7UA9KC_zpZ6cs=' },
    { id: 's5', name: 'Hiking Boots', price: 5299, image: 'https://media.istockphoto.com/id/182443321/photo/trekking-boots-on-the-background-of-himalayas.webp?a=1&b=1&s=612x612&w=0&k=20&c=HA2Uf_IZj40B7f8A2kMAFWpSj9gLtTqtsvHqrtMT8ng=' },
    { id: 's6', name: 'Sliders', price: 799, image: 'https://media.istockphoto.com/id/2209901280/photo/human-feet-wearing-flip-flops-hd-stock-photo.webp?a=1&b=1&s=612x612&w=0&k=20&c=Kr6Bxowha7fOnVgRYWCuXCJv5UFQRmtfPXlWa-vZQEA=' }
  ],

   Kitchen: [
    { id: 'k1', name: 'Non-stick Pan Set', price: 2199, image: 'https://media.istockphoto.com/id/1321699160/photo/frying-pan-with-non-stick-ceramic-coating-and-spatula-on-a-white-wooden-background-cooking.webp?a=1&b=1&s=612x612&w=0&k=20&c=JKJhETxiD1wCUEyqeiAC9_hluMIrWV1OdzFzMZ-ZkVU=' },
    { id: 'k2', name: 'Stainless Steel Cookware', price: 3199, image: 'https://media.istockphoto.com/id/480132468/photo/midsection-image-of-woman-cooking-food-in-pan.webp?a=1&b=1&s=612x612&w=0&k=20&c=o8zgQ7wmhpnsyQKdfwdSp0-TwxNPZxauzKEDxsiAbqE=' },
    { id: 'k3', name: 'Electric Kettle', price: 1499, image: 'https://media.istockphoto.com/id/1254254675/photo/stainless-electric-kettle-on-table.webp?a=1&b=1&s=612x612&w=0&k=20&c=bW3ey9ZY7tRTF6bhH1V5V6rQ4GiZpiL9BpzO3hF--20=' },
    { id: 'k4', name: 'Knife Set with Stand', price: 999, image: 'https://media.istockphoto.com/id/1279532140/photo/set-of-kitchen-knives-on-a-wooden-cutting-board.webp?a=1&b=1&s=612x612&w=0&k=20&c=IBKb_XhSOJrDKsjAcObVe9Pxhuk9UGEo9kiOQmzip1A=' },
    { id: 'k5', name: 'Microwave Oven', price: 6499, image: 'https://media.istockphoto.com/id/182915079/photo/microwave-oven.webp?a=1&b=1&s=612x612&w=0&k=20&c=qPs1Y2yCQb4XPSo4W_depmDyEMPFf2gk_kUFqTljMWw=' },
    { id: 'k6', name: 'Digital Weighing Scale', price: 599, image: 'https://media.istockphoto.com/id/1474842424/photo/weigh-in-fat-digital-scale-overweight.webp?a=1&b=1&s=612x612&w=0&k=20&c=d_U00Qt5yOpXSjCPLnytdlPHY9fIsts5qUfZQCdf4Yg=' }
  ]



};

const Categories = ({ allowSearch = false }) => {
  const categories = Object.keys(data);
  const [active, setActive] = useState(categories[0]);
  const { searchActive, searchTerm, setSearchTerm } = useSearch();

  const filteredProducts = allowSearch && searchActive
    ? data[active].filter(product =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : data[active];

  useEffect(() => {
    if (!searchActive) setSearchTerm('');
  }, [searchActive, setSearchTerm]);

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-5 gap-10">
        {/* Sidebar */}
        <aside className="md:sticky md:top-20 self-start bg-white rounded-lg shadow p-6">
          <h3 className="mb-6 text-sm font-semibold text-gray-600 uppercase tracking-wide border-b border-gray-200 pb-2">
            Categories
          </h3>
          <ul className="space-y-3">
            {categories.map(cat => (
              <li
                key={cat}
                onClick={() => setActive(cat)}
                className={`cursor-pointer px-3 py-2 rounded-md transition-colors
                  ${
                    active === cat
                      ? 'bg-black text-white font-semibold shadow'
                      : 'text-gray-700 hover:bg-gray-800 hover:text-white'
                  }`}
                tabIndex={0}
                onKeyPress={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') setActive(cat);
                }}
                role="button"
                aria-pressed={active === cat}
              >
                {cat}
              </li>
            ))}
          </ul>
        </aside>

        {/* Main content */}
        <main className="md:col-span-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProducts.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>

          {allowSearch && searchActive && filteredProducts.length === 0 && (
            <p className="mt-12 text-center text-gray-500 italic">
              No products found matching <span className="font-semibold">"{searchTerm}"</span>
            </p>
          )}
        </main>
      </div>
    </div>
  );
};
  export default Categories;