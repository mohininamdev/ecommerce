import { CheckCircle, Pencil, Trash2, X } from 'lucide-react';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import WhiteTshirt from "../../assets/adminProductImg/whiteTsrt.png"
import redTshirt from "../../assets/adminProductImg/red-tshirt.png"
import menHoodie from "../../assets/adminProductImg/men-hoodie.png"
import whiteBlackTshirt from "../../assets/adminProductImg/white-black-striped.png"
import whiteWomenTshirt from "../../assets/adminProductImg/white-women-tshirt.png"

const adminProducts = [
  {
    id: 1,
    name: 'Men Grey Hoodie',
    category: 'Hoodies',
    inventory: 96,
    inStock: true,
    color: 'Black',
    price: 49.9,
    rating: 5.0,
    image: menHoodie,
  },
  {
    id: 2,
    name: 'Women Striped T-Shirt',
    category: 'T-Shirt',
    inventory: 56,
    inStock: true,
    color: 'White',
    price: 34.9,
    rating: 4.8,
    image: whiteBlackTshirt,
  },
  
    {
      id: 3,
      name: "Women White T-Shirt",
      category: "T-Shirt",
      inventory: 78,
      inStock: true,
      color: "White",
      price: 40.90,
      rating: 5.0,
      votes: 54,
      image: whiteWomenTshirt,
    },
    {
      id: 4,
      name: "Men White T-Shirt",
      category: "T-Shirt",
      inventory: 32,
      inStock: true,
      color: "White",
      price: 49.90,
      rating: 4.5,
      votes: 31,
      image: WhiteTshirt,
    },
    {
      id: 5,
      name: "Women Red T-Shirt",
      category: "T-Shirt",
      inventory: 32,
      inStock: true,
      color: "White",
      price: 34.90,
      rating: 4.9,
      votes: 22,
      image: redTshirt,
    },
    {
      id: 6,
      name: "Men Grey Hoodie",
      category: "Hoodies",
      inventory: 96,
      inStock: true,
      color: "Black",
      price: 49.90,
      rating: 5.0,
      votes: 32,
      image: menHoodie,
    },
    {
      id: 7,
      name: "Women Striped T-Shirt",
      category: "T-Shirt",
      inventory: 56,
      inStock: true,
      color: "White",
      price: 34.90,
      rating: 4.8,
      votes: 24,
      image: whiteBlackTshirt,
    },
    {
      id: 8,
      name: "Women White T-Shirt",
      category: "T-Shirt",
      inventory: 0,
      inStock: false,
      color: "White",
      price: 40.90,
      rating: 5.0,
      votes: 54,
      image: whiteBlackTshirt,
    },
    {
      id: 9,
      name: "Men White T-Shirt",
      category: "T-Shirt",
      inventory: 0,
      inStock: false,
      color: "White",
      price: 49.90,
      rating: 4.5,
      votes: 31,
      image: WhiteTshirt,
    },
    {
      id: 10,
      name: "Women Red T-Shirt",
      category: "T-Shirt",
      inventory: 0,
      inStock: false,
      color: "White",
      price: 34.90,
      rating: 4.9,
      votes: 22,
      image: redTshirt,
    },
    {
      id: 11,
      name: "Men Black Hoodie",
      category: "Hoodies",
      inventory: 45,
      inStock: true,
      color: "Black",
      price: 44.90,
      rating: 4.7,
      votes: 27,
      image: menHoodie,
    },
    {
      id: 12,
      name: "Women Blue T-Shirt",
      category: "T-Shirt",
      inventory: 60,
      inStock: true,
      color: "Blue",
      price: 36.90,
      rating: 4.6,
      votes: 20,
      image: menHoodie,
    },
    {
      id: 13,
      name: "Men Navy T-Shirt",
      category: "T-Shirt",
      inventory: 72,
      inStock: true,
      color: "Navy",
      price: 38.90,
      rating: 4.9,
      votes: 29,
      image: menHoodie,
    },
    {
      id: 14,
      name: "Women Green T-Shirt",
      category: "T-Shirt",
      inventory: 18,
      inStock: true,
      color: "Green",
      price: 35.90,
      rating: 4.3,
      votes: 14,
      image: menHoodie,
    },
    {
      id: 15,
      name: "Men Blue Hoodie",
      category: "Hoodies",
      inventory: 50,
      inStock: true,
      color: "Blue",
      price: 46.90,
      rating: 4.8,
      votes: 33,
      image: menHoodie,
    },
    {
      id: 16,
      name: "Women Pink T-Shirt",
      category: "T-Shirt",
      inventory: 0,
      inStock: false,
      color: "Pink",
      price: 32.90,
      rating: 4.4,
      votes: 19,
      image: WhiteTshirt,
    },
    {
      id: 17,
      name: "Men Orange T-Shirt",
      category: "T-Shirt",
      inventory: 25,
      inStock: true,
      color: "Orange",
      price: 37.90,
      rating: 4.5,
      votes: 17,
      image: WhiteTshirt,
    },
    {
      id: 18,
      name: "Women Yellow T-Shirt",
      category: "T-Shirt",
      inventory: 29,
      inStock: true,
      color: "Yellow",
      price: 36.90,
      rating: 4.6,
      votes: 21,
      image: whiteWomenTshirt,
    },
    {
      id: 19,
      name: "Men White Hoodie",
      category: "Hoodies",
      inventory: 12,
      inStock: true,
      color: "White",
      price: 47.90,
      rating: 4.9,
      votes: 26,
      image: menHoodie,
    },
    {
      id: 20,
      name: "Women Purple T-Shirt",
      category: "T-Shirt",
      inventory: 0,
      inStock: false,
      color: "Purple",
      price: 34.90,
      rating: 4.7,
      votes: 23,
      image: whiteWomenTshirt,
    },
];

const AdminProducts = () => {
  const [products, setProducts] = useState(adminProducts);
  const [stockFilter, setStockFilter] = useState("All");
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [showConfirm, setShowConfirm] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showExportSuccess, setShowExportSuccess] = useState(false);
  const [ setIsAllSelected] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  const filteredProducts = products.filter(product => {
    const matchesStock = stockFilter === "All" 
      || (stockFilter === "In Stock" && product.inStock) 
      || (stockFilter === "Out of Stock" && !product.inStock);
  
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase());
  
    return matchesStock && matchesSearch;
  });
 
  const productsPerPage = 7;
  const navigate = useNavigate();
  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);
  const startIndex = (currentPage - 1) * productsPerPage;
  const currentProducts = filteredProducts.slice(startIndex, startIndex + productsPerPage);
 
  const toggleSelectProduct = (id) => {
    setSelectedProducts((prev) =>
      prev.includes(id) ? prev.filter((pid) => pid !== id) : [...prev, id]
    );
  };
  const toggleSelectAll = () => {
    const allFilteredIds = filteredProducts.map(p => p.id);
    const allSelected = allFilteredIds.every(id => selectedProducts.includes(id));
  
    if (allSelected) {
      setSelectedProducts(prev => prev.filter(id => !allFilteredIds.includes(id)));
      setIsAllSelected(false);
    } else {
      setSelectedProducts([...new Set([...selectedProducts, ...allFilteredIds])]);
      setIsAllSelected(true);
    }
  };
  
  const deleteSelectedProducts = () => {
    setProducts(products.filter((product) => !selectedProducts.includes(product.id)));
    setSelectedProducts([]);
    setShowConfirm(false);
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 2000);
  };
  const exportToCSV = () => {
    const headers = ['Name', 'Category', 'Inventory', 'Color', 'Price', 'Rating'];
    const rows = filteredProducts.map(p => [
      p.name,
      p.category,
      p.inventory,
      p.color,
      `$${p.price.toFixed(2)}`,
      `${p.rating.toFixed(1)} (${p.votes || 0} Votes)`
    ]);
  
    const csvContent = [
      headers.join(','),
      ...rows.map(row => row.join(','))
    ].join('\n');
  
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'products_export.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    setShowExportSuccess(true);
  };

  return (
    <div className="p-6 relative">
      <div className="flex justify-between items-center mb-4 gap-4">
        <h1 className="text-2xl font-bold">Products</h1>
        <div className="flex gap-2">
          <button 
          onClick={exportToCSV}
          className="px-3 py-1 rounded bg-red-700 text-white hover:bg-red-900">Export</button>
          
          <button className="px-3 py-1 rounded bg-red-700 text-white hover:bg-red-900"
                  onClick={() => navigate("/admin/add-products")}  
          >+ Add Product</button>
        </div>
      </div>

      <div className="p-6 bg-white w-full max-h-screen space-y-6">
        <div className="flex justify-between items-center">
          <div className="flex flex-wrap gap-4 mb-4">
            <select
                className="border rounded px-3 py-2"
              value={stockFilter}
              onChange={(e) => {
                setStockFilter(e.target.value);
                setCurrentPage(1); // Reset to first page on filter change
              }}
              >
              <option value="All">All</option>
              <option value="Out of Stock">Out of Stock</option>
              <option value="In Stock">In Stock</option>
            </select>

          <input
            type="text"
            placeholder="Search..."
            className="border rounded px-3 py-2 min-w-52 md:min-w-76"
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setCurrentPage(1); // Reset to page 1 on search
            }}
          />

          </div>
          <div className="flex flex-wrap gap-4 mb-4">
            <button className="hover:text-red-800 flex text-gray-600 cursor-pointer">
              <Pencil size={18} />
            </button>
            <button
              className="flex text-red-700 hover:text-red-600"
              onClick={() => selectedProducts.length > 0 && setShowConfirm(true)}
            >
              <Trash2 size={18} />
            </button>
          </div>
        </div>

        <div className="bg-white shadow rounded overflow-x-auto">       
        <table className="min-w-full text-sm text-left">
          <thead className="bg-gray-100 text-gray-600">
            <tr className=" text-gray-700 text-sm">
              <th className="p-2">
                <input type="checkbox"
                      checked={filteredProducts.length > 0 && filteredProducts.every(product => selectedProducts.includes(product.id))}
                      onChange={toggleSelectAll}
               />
              </th>
              <th className="px-4 py-2">Product</th>
              <th className="px-4 py-2">Inventory</th>
              <th className="px-4 py-2">Color</th>
              <th className="px-4 py-2">Price</th>
              <th className="px-4 py-2">Rating</th>
            </tr>
          </thead>
          <tbody>
            {currentProducts.map((product) => (
              <tr key={product.id} className="border-b hover:bg-gray-50">
                <td className="px-4 py-2">
                  <input
                    type="checkbox"
                    checked={selectedProducts.includes(product.id)}
                    onChange={() => toggleSelectProduct(product.id)}
                  />
                </td>
                <td className="px-4 py-2 flex items-center gap-2">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-10 h-10 rounded object-cover"
                  />
                  <div>
                    <div className="font-medium">{product.name}</div>
                    <div className="text-gray-500 text-xs">{product.category}</div>
                  </div>
                </td>
                <td className="px-4 py-2">
                  {product.inStock ? (
                    `${product.inventory} in stock`
                  ) : (
                    <span className="bg-gray-100 text-gray-600 text-xs px-2 py-1 rounded">
                      Out of Stock
                    </span>
                  )}
                </td>
                <td className="px-4 py-2">{product.color}</td>
                <td className="px-4 py-2">${product.price.toFixed(2)}</td>
                <td className="px-4 py-2">
                  {product.rating.toFixed(1)} ({product.votes} Votes)
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        </div>

        {/* Pagination */}
        <div className="flex items-center justify-between p-4 border-t text-sm text-gray-600">
          <div className="space-x-2">
            <button
              className="px-2 py-1"
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
            >
              ←
            </button>
            {Array.from({ length: totalPages }, (_, i) => (
              <button
                key={i + 1}
                onClick={() => setCurrentPage(i + 1)}
                className={`px-2 py-1 rounded ${
                  currentPage === i + 1 ? 'bg-red-500 text-white' : 'hover:bg-gray-100'
                }`}
              >
                {i + 1}
              </button>
            ))}
            <button
              className="px-2 py-1"
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
            >
              →
            </button>
          </div>
          <div>{products.length} Results</div>
        </div>
      </div>

      {/* Delete Confirmation */}
      {showConfirm && (
        <div className="fixed inset-0 bg-black bg-opacity-30 flex justify-center items-center z-50">
                  <div className="bg-white md:w-96 p-6 rounded-lg shadow-lg relative">
                    <button onClick={() => setShowConfirm(false)} className="absolute top-2 right-2">
                      <X className="text-gray-500 hover:text-gray-700" size={20} />
                    </button>
                    <h3 className="text-lg font-bold mb-2">Delete Product(s)?</h3>
                    <p className="text-sm mb-6">Are you sure you want to delete the selected product(s)?</p>
                    <div className="flex justify-end gap-4">
                      <button
                        onClick={() => setShowConfirm(false)}
                        className="px-4 py-2 rounded bg-gray-300 hover:bg-gray-400"
                      >
                        No
                      </button>
                      <button
                        onClick={deleteSelectedProducts}
                        className="px-4 py-2 rounded bg-red-600 text-white hover:bg-red-700"
                      >
                        Yes
                      </button>
                    </div>
                  </div>
                </div>
      )}

      {/* Success Feedback */}
      {showSuccess && (
        <div className="fixed inset-0 bg-black bg-opacity-30 flex justify-center items-center z-50">
                  <div className="bg-white flex justify-center items-center md:w-96 p-6 rounded-lg shadow-lg relative gap-2">
                  <button onClick={() => setShowConfirm(false)} className="absolute top-2 right-2">
                      <X className="text-gray-500 hover:text-gray-700" size={20} />
                    </button>
                  <CheckCircle className="text-red-600 " size={24} />
                  <div className="text-sm font-medium text-red-600">Deleted successfully!</div>
                </div>
                </div>
      )}

      {showExportSuccess && (
        <div className="fixed inset-0 bg-black bg-opacity-30 flex justify-center items-center z-50">
          <div className="bg-white w-[90%] max-w-md p-6 rounded-lg shadow-lg relative">
            {/* Close Icon */}
            <button onClick={() => setShowExportSuccess(false)} className="absolute top-2 right-2">
              <X className="text-gray-500 hover:text-gray-700" size={20} />
            </button>

            {/* Success Message */}
            <div className="flex flex-col items-center">
              <CheckCircle className="text-green-500" size={48} />
              <h3 className="text-xl font-semibold mt-4 mb-2">Export Successful</h3>
              <p className="text-sm text-gray-600 mb-6 text-center">
                Your product list has been exported successfully.
              </p>

              {/* Continue Button */}
              <button
                onClick={() => setShowExportSuccess(false)}
                className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
              >
                Continue
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminProducts;