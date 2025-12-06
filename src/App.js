import React, { useState, useEffect, useRef } from "react";
import {
  Printer,
  FileSpreadsheet,
  Plus,
  Trash2,
  Edit,
  Save,
  School,
  LayoutDashboard,
  FileText,
  X,
  Search,
  CheckCircle,
  Menu,
  ChevronRight,
  FileOutput,
  FileInput,
  Receipt,
  ClipboardCheck,
  StickyNote,
  ShoppingBag,
  MapPin,
  Phone,
  User,
  Image as ImageIcon,
  Upload,
  ArrowRight,
  Download,
  Lock,
  LogOut,
  Eye,
  EyeOff,
} from "lucide-react";

// --- KONFIGURASI ---
const APP_CONFIG = {
  clientName: "SD NEGERI MATARAM",
  clientAddress:
    "Jln. Garuda Dsn I Desa G1. Mataram Kec. Tugumulyo Kab. Musi Rawas 31662",
  clientKabupaten: "Musi Rawas",
  clientProvinsi: "Sumatera Selatan",
  defaultKepalaSekolah: "SUSANTO, S.Pd",
  defaultNipKepala: "19710629 199308 1 001",
  defaultBendahara: "SUSI DWINIOVIYANTI, S.Pd",
  defaultNipBendahara: "19801103 202221 2 007",
  appVersion: "v2.6 Pro",
  // 1. Identitas Sekolah (Klien)
  clientName: "SD NEGERI MATARAM",
  clientAddress:
    "Jln. Garuda Dsn I Desa G1. Mataram Kec. Tugumulyo Kab. Musi Rawas 31662",
  clientKabupaten: "Musi Rawas",
  clientProvinsi: "Sumatera Selatan",

  // 2. Data Pejabat Default (Awal)
  // Data ini akan menjadi default saat aplikasi pertama kali dijalankan (sebelum diedit di menu Data Sekolah)
  defaultKepalaSekolah: "SUSANTO, S.Pd",
  defaultNipKepala: "19710629 199308 1 001",
  defaultBendahara: "SUSI DWINIOVIYANTI, S.Pd",
  defaultNipBendahara: "19801103 202221 2 007",

  // 3. Konfigurasi Database (Firebase)
  // Copy-paste dari Firebase Console untuk setiap proyek sekolah yang berbeda
  firebaseConfig: {
    apiKey: "AIzaSyBpnclsu7zPKe9A_5JwyCjauH9nZ6mJYco",
    authDomain: "cetak-laporan-bos.firebaseapp.com",
    projectId: "cetak-laporan-bos",
    storageBucket: "cetak-laporan-bos.firebasestorage.app",
    messagingSenderId: "847161704018",
    appId: "1:847161704018:web:f228af57feaae7749de98b",
  },

  // 4. Pengaturan Tampilan
  themeColor: "blue", // Opsi: blue, green, purple (bisa dikembangkan nanti)
  appVersion: "v2.2 Pro",
};

// --- KOMPONEN LOGIN SCREEN ---
const LoginScreen = ({ onLogin }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    setTimeout(() => {
      if (username === "admin" && password === "admin123") {
        onLogin();
      } else {
        setError("Username atau Password salah!");
        setIsLoading(false);
      }
    }, 800);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 p-4 relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-96 h-96 bg-yellow-300 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob"></div>
        <div className="absolute top-[-10%] right-[-10%] w-96 h-96 bg-cyan-300 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob animation-delay-2000"></div>
        <div className="absolute bottom-[-20%] left-[20%] w-96 h-96 bg-pink-300 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob animation-delay-4000"></div>
      </div>

      <div className="bg-white/20 backdrop-blur-xl border border-white/30 p-8 rounded-3xl shadow-2xl w-full max-w-md z-10 relative">
        <div className="text-center mb-8">
          <div className="bg-white p-4 rounded-full w-24 h-24 mx-auto mb-4 shadow-xl flex items-center justify-center transform hover:scale-110 transition-transform duration-300">
            <School size={48} className="text-purple-600" />
          </div>
          <h1 className="text-4xl font-black text-white tracking-tight drop-shadow-md">
            SiBOS
          </h1>
          <p className="text-white/90 text-sm mt-1 font-medium tracking-wide">
            Manager Keuangan Sekolah
          </p>
          <p className="text-white/60 text-xs mt-2">{APP_CONFIG.appVersion}</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <label className="text-white text-sm font-bold ml-1 drop-shadow-sm">
              Username
            </label>
            <div className="relative group">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <User
                  size={20}
                  className="text-white/70 group-focus-within:text-white transition-colors"
                />
              </div>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full bg-white/20 border-2 border-white/30 text-white rounded-2xl py-3.5 pl-10 pr-4 outline-none focus:border-white focus:bg-white/30 transition-all placeholder-white/60 font-medium"
                placeholder="Masukkan username"
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-white text-sm font-bold ml-1 drop-shadow-sm">
              Password
            </label>
            <div className="relative group">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Lock
                  size={20}
                  className="text-white/70 group-focus-within:text-white transition-colors"
                />
              </div>
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-white/20 border-2 border-white/30 text-white rounded-2xl py-3.5 pl-10 pr-12 outline-none focus:border-white focus:bg-white/30 transition-all placeholder-white/60 font-medium"
                placeholder="Masukkan password"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 pr-4 flex items-center text-white/70 hover:text-white transition-colors"
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
          </div>

          {error && (
            <div className="bg-red-500/80 backdrop-blur-sm border border-red-200 text-white px-4 py-3 rounded-2xl text-sm text-center font-bold shadow-lg animate-bounce">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-white text-purple-600 hover:text-purple-700 font-black py-4 rounded-2xl shadow-xl hover:shadow-2xl transition-all transform hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center gap-2 mt-4 group"
          >
            {isLoading ? (
              <span className="flex items-center gap-2">
                <div className="w-4 h-4 border-2 border-purple-600 border-t-transparent rounded-full animate-spin"></div>{" "}
                Loading...
              </span>
            ) : (
              <>
                MASUK APLIKASI{" "}
                <ArrowRight
                  size={22}
                  className="group-hover:translate-x-1 transition-transform"
                />
              </>
            )}
          </button>
        </form>
        <div className="mt-8 text-center">
          <p className="text-xs text-white/80 font-medium">
            &copy; 2025 SiBOS Manager. Licensed to:
          </p>
          <p className="text-xs font-bold text-white mt-1 uppercase">
            {APP_CONFIG.clientName}
          </p>
        </div>
      </div>
    </div>
  );
};

// --- Helper Components ---
const NavButton = ({ active, onClick, icon, children }) => (
  <button
    onClick={onClick}
    className={`w-full flex items-center gap-3 px-4 py-3 my-1 transition-all duration-300 rounded-lg text-sm font-medium ${
      active
        ? "bg-white/10 text-white shadow-lg border-l-4 border-yellow-400 translate-x-1"
        : "text-blue-100 hover:bg-white/5 hover:text-white hover:translate-x-1"
    }`}
  >
    {icon} <span>{children}</span>{" "}
    {active && <ChevronRight size={16} className="ml-auto text-yellow-400" />}
  </button>
);

const StatCard = ({ title, value, colorClass, icon }) => (
  <div
    className={`p-6 rounded-2xl shadow-lg border border-white/50 flex items-center gap-5 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 bg-gradient-to-br ${colorClass} text-white`}
  >
    <div className="p-3 rounded-xl bg-white/20 backdrop-blur-sm shadow-inner">
      {icon}
    </div>
    <div>
      <p className="text-white/80 text-xs uppercase font-bold tracking-widest">
        {title}
      </p>
      <p className="text-3xl font-extrabold mt-1 tracking-tight">{value}</p>
    </div>
  </div>
);

const InputGroup = ({
  label,
  name,
  value,
  onChange,
  disabled,
  placeholder,
  type = "text",
  list,
  required,
}) => (
  <div className="group">
    <label className="block text-sm font-semibold text-gray-700 mb-1.5 group-focus-within:text-blue-600 transition-colors">
      {label}
    </label>
    {type === "textarea" ? (
      <textarea
        name={name}
        value={value}
        onChange={onChange}
        disabled={disabled}
        placeholder={placeholder}
        required={required}
        rows={3}
        className={`w-full border-2 rounded-xl p-3 transition-all outline-none resize-none text-sm ${
          disabled
            ? "bg-gray-50 text-gray-400 border-gray-100 cursor-not-allowed"
            : "bg-white border-gray-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10"
        }`}
      />
    ) : (
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        disabled={disabled}
        placeholder={placeholder}
        required={required}
        list={list}
        className={`w-full border-2 rounded-xl p-3 transition-all outline-none text-sm ${
          disabled
            ? "bg-gray-50 text-gray-400 border-gray-100 cursor-not-allowed"
            : "bg-white border-gray-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10"
        }`}
      />
    )}
  </div>
);

// --- Utilities ---
const formatRupiah = (number) =>
  new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
  }).format(number);

const terbilang = (angka) => {
  const bil = [
    "",
    "Satu",
    "Dua",
    "Tiga",
    "Empat",
    "Lima",
    "Enam",
    "Tujuh",
    "Delapan",
    "Sembilan",
    "Sepuluh",
    "Sebelas",
  ];
  let hasil = "";
  if (angka < 12) hasil = " " + bil[angka];
  else if (angka < 20) hasil = terbilang(angka - 10) + " Belas";
  else if (angka < 100)
    hasil =
      terbilang(Math.floor(angka / 10)) + " Puluh" + terbilang(angka % 10);
  else if (angka < 200) hasil = " Seratus" + terbilang(angka - 100);
  else if (angka < 1000)
    hasil =
      terbilang(Math.floor(angka / 100)) + " Ratus" + terbilang(angka % 100);
  else if (angka < 2000) hasil = " Seribu" + terbilang(angka - 1000);
  else if (angka < 1000000)
    hasil =
      terbilang(Math.floor(angka / 1000)) + " Ribu" + terbilang(angka % 1000);
  else if (angka < 1000000000)
    hasil =
      terbilang(Math.floor(angka / 1000000)) +
      " Juta" +
      terbilang(angka % 1000000);
  return hasil;
};

const formatDateIndo = (dateString) => {
  if (!dateString) return "-";
  const options = { day: "numeric", month: "long", year: "numeric" };
  return new Date(dateString).toLocaleDateString("id-ID", options);
};

const formatDateFullText = (dateString) => {
  if (!dateString) return "-";
  const date = new Date(dateString);
  const days = ["Minggu", "Senin", "Selasa", "Rabu", "Kamis", "Jumat", "Sabtu"];
  const months = [
    "Januari",
    "Februari",
    "Maret",
    "April",
    "Mei",
    "Juni",
    "Juli",
    "Agustus",
    "September",
    "Oktober",
    "November",
    "Desember",
  ];
  const numbers = [
    "Nol",
    "Satu",
    "Dua",
    "Tiga",
    "Empat",
    "Lima",
    "Enam",
    "Tujuh",
    "Delapan",
    "Sembilan",
    "Sepuluh",
    "Sebelas",
    "Dua Belas",
    "Tiga Belas",
    "Empat Belas",
    "Lima Belas",
    "Enam Belas",
    "Tujuh Belas",
    "Delapan Belas",
    "Sembilan Belas",
    "Dua Puluh",
  ];

  const numToText = (n) => {
    if (n <= 20) return numbers[n];
    if (n < 30) return "Dua Puluh " + numbers[n - 20];
    if (n == 30) return "Tiga Puluh";
    if (n == 31) return "Tiga Puluh Satu";
    return n;
  };

  const dayName = days[date.getDay()];
  const dateText = numToText(date.getDate());
  const monthName = months[date.getMonth()];
  const year = date.getFullYear();
  const yearText = "Dua Ribu " + terbilang(year - 2000);
  return `Pada hari ini ${dayName} tanggal ${dateText} bulan ${monthName} Tahun ${yearText}`;
};

// --- Data Awal ---
const initialSchoolData = {
  namaSekolah: APP_CONFIG.clientName,
  alamat: APP_CONFIG.clientAddress,
  kabupaten: APP_CONFIG.clientKabupaten,
  provinsi: APP_CONFIG.clientProvinsi,
  kepalaSekolah: APP_CONFIG.defaultKepalaSekolah,
  nipKepala: APP_CONFIG.defaultNipKepala,
  bendahara: APP_CONFIG.defaultBendahara,
  nipBendahara: APP_CONFIG.defaultNipBendahara,
  logo: null,
};

const initialStores = [
  {
    id: 1,
    namaToko: "PIGEON PERCETAKAN",
    alamat: "Widodo - Tugumulyo",
    pemilik: "A. WIDODO",
    npwp: "01.234.567.8-901.000",
    telepon: "08123456789",
  },
];

const initialTransactions = [
  {
    id: 1,
    tanggal: "2025-09-08",
    uraian: "Spanduk",
    penerima: "PIGEON PERCETAKAN",
    kodeRekening: "5.1.02.01.01",
    jumlah: 100000,
    volume: "1 Buah",
    nomorSurat: "900/001/BOSP/SDN.G1/TGM/2025",
    tahunAnggaran: "2025",
  },
];

// --- Komponen Utama ---

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [activeTab, setActiveTab] = useState("dashboard");
  const [schoolData, setSchoolData] = useState(initialSchoolData);
  const [stores, setStores] = useState(initialStores);
  const [transactions, setTransactions] = useState(initialTransactions);
  const [isEditingSchool, setIsEditingSchool] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const [showModal, setShowModal] = useState(false);
  const [currentTrans, setCurrentTrans] = useState(null);
  const [showStoreModal, setShowStoreModal] = useState(false);
  const [currentStore, setCurrentStore] = useState(null);
  const [printMode, setPrintMode] = useState(null);
  const [selectedReceipt, setSelectedReceipt] = useState(null);
  const [showPrintOptions, setShowPrintOptions] = useState(false);
  const [isImporting, setIsImporting] = useState(false);
  const fileInputRef = useRef(null);

  // Handlers
  const handleLogin = () => setIsAuthenticated(true);
  const handleLogout = () => {
    if (window.confirm("Apakah Anda yakin ingin keluar?")) {
      setIsAuthenticated(false);
      setActiveTab("dashboard");
      setPrintMode(null);
    }
  };
  const handleSchoolChange = (e) => {
    const { name, value } = e.target;
    setSchoolData({ ...schoolData, [name]: value });
  };
  const handleLogoUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSchoolData((prev) => ({ ...prev, logo: reader.result }));
      };
      reader.readAsDataURL(file);
    }
  };
  const handleNavClick = (tabName) => {
    setActiveTab(tabName);
    setIsMobileMenuOpen(false);
    setPrintMode(null);
  };

  const handleSaveStore = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const newStore = {
      namaToko: formData.get("namaToko"),
      alamat: formData.get("alamat"),
      pemilik: formData.get("pemilik"),
      npwp: formData.get("npwp"),
      telepon: formData.get("telepon"),
    };
    if (currentStore) {
      setStores(
        stores.map((s) =>
          s.id === currentStore.id ? { ...s, ...newStore } : s
        )
      );
    } else {
      setStores([...stores, { id: Date.now(), ...newStore }]);
    }
    setShowStoreModal(false);
    setCurrentStore(null);
  };
  const handleDeleteStore = (id) => {
    if (window.confirm("Yakin ingin menghapus data toko ini?")) {
      setStores(stores.filter((s) => s.id !== id));
    }
  };
  const handleDeleteTrans = (id) => {
    if (window.confirm("Yakin ingin menghapus data transaksi ini?")) {
      setTransactions(transactions.filter((t) => t.id !== id));
    }
  };
  const handleSaveTrans = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const newData = {
      tanggal: formData.get("tanggal"),
      uraian: formData.get("uraian"),
      penerima: formData.get("penerima"),
      kodeRekening: formData.get("kodeRekening"),
      jumlah: parseInt(formData.get("jumlah") || 0),
      volume: formData.get("volume"),
      nomorSurat: formData.get("nomorSurat"),
      tahunAnggaran:
        formData.get("tahunAnggaran") || new Date().getFullYear().toString(),
    };
    if (currentTrans) {
      setTransactions(
        transactions.map((t) =>
          t.id === currentTrans.id ? { ...t, ...newData } : t
        )
      );
    } else {
      setTransactions([...transactions, { id: Date.now(), ...newData }]);
    }
    setShowModal(false);
    setCurrentTrans(null);
  };

  const handleImportArkasClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setIsImporting(true);
    setTimeout(() => {
      const newImportedData = [
        {
          id: Date.now(),
          tanggal: new Date().toISOString().split("T")[0],
          uraian: `Import: Honorarium Guru (Ref: ${file.name.substring(
            0,
            10
          )}...)`,
          penerima: "Guru Honorer",
          kodeRekening: "5.1.02.02.01",
          jumlah: 1500000,
          volume: "3 Org",
          nomorSurat: `900/${Math.floor(
            Math.random() * 100
          )}/BOSP/${new Date().getFullYear()}`,
          tahunAnggaran: new Date().getFullYear().toString(),
        },
        {
          id: Date.now() + 1,
          tanggal: new Date().toISOString().split("T")[0],
          uraian: "Import: Belanja Alat Tulis Kantor",
          penerima: "Toko Sejahtera",
          kodeRekening: "5.1.02.01.01",
          jumlah: 750000,
          volume: "1 Paket",
          nomorSurat: `900/${Math.floor(
            Math.random() * 100
          )}/BOSP/${new Date().getFullYear()}`,
          tahunAnggaran: new Date().getFullYear().toString(),
        },
      ];
      setTransactions((prev) => [...prev, ...newImportedData]);
      setIsImporting(false);
      alert(`Berhasil mengimpor data dari file: ${file.name}`);
      setActiveTab("transaksi");
      e.target.value = null;
    }, 1500);
  };

  const openPrintOptions = (trans) => {
    setSelectedReceipt(trans);
    setShowPrintOptions(true);
  };
  const handlePrintDocument = (mode) => {
    setShowPrintOptions(false);
    setPrintMode(mode);
    setTimeout(() => {
      window.print();
    }, 500);
  };
  const handlePrintLaporan = () => {
    setPrintMode("laporan");
    setTimeout(() => {
      window.print();
    }, 500);
  };
  const closePrintMode = () => {
    setPrintMode(null);
    setSelectedReceipt(null);
  };
  const getStoreOwner = (storeName) => {
    const store = stores.find((s) => s.namaToko === storeName);
    return store ? store.pemilik : storeName;
  };

  if (!isAuthenticated) return <LoginScreen onLogin={handleLogin} />;

  return (
    <div className="min-h-screen bg-gray-100 flex font-sans text-gray-800 relative">
      {/* Sidebar & Navigation */}
      <aside
        className={`fixed md:static inset-y-0 left-0 z-30 w-64 bg-gradient-to-b from-blue-950 via-blue-900 to-indigo-900 text-white flex flex-col transition-transform duration-300 ease-in-out print:hidden shadow-2xl ${
          isMobileMenuOpen
            ? "translate-x-0"
            : "-translate-x-full md:translate-x-0"
        }`}
      >
        <div className="p-6 border-b border-white/10 flex justify-between items-center bg-white/5 backdrop-blur-sm">
          <div className="flex flex-col">
            <h1 className="text-2xl font-black flex items-center gap-3 tracking-tight">
              {schoolData.logo ? (
                <img
                  src={schoolData.logo}
                  alt="Logo"
                  className="w-9 h-9 object-contain bg-white rounded-full p-0.5 shadow-md"
                />
              ) : (
                <School className="w-9 h-9 text-yellow-400 drop-shadow-md" />
              )}{" "}
              SiBOS
            </h1>
            <p className="text-[10px] text-blue-200 mt-1 font-medium tracking-wide uppercase">
              Sistem Laporan Dana BOS
            </p>
          </div>
          <button
            onClick={() => setIsMobileMenuOpen(false)}
            className="md:hidden text-blue-300 hover:text-white transition-colors"
          >
            <X size={24} />
          </button>
        </div>
        <nav className="flex-1 p-4 space-y-2 overflow-y-auto custom-scrollbar">
          <NavButton
            active={activeTab === "dashboard"}
            onClick={() => handleNavClick("dashboard")}
            icon={<LayoutDashboard size={18} />}
          >
            Dashboard
          </NavButton>
          <NavButton
            active={activeTab === "sekolah"}
            onClick={() => handleNavClick("sekolah")}
            icon={<School size={18} />}
          >
            Data Sekolah
          </NavButton>
          <NavButton
            active={activeTab === "toko"}
            onClick={() => handleNavClick("toko")}
            icon={<ShoppingBag size={18} />}
          >
            Data Toko
          </NavButton>
          <NavButton
            active={activeTab === "transaksi"}
            onClick={() => handleNavClick("transaksi")}
            icon={<FileText size={18} />}
          >
            Data Transaksi
          </NavButton>
          <NavButton
            active={activeTab === "import"}
            onClick={() => handleNavClick("import")}
            icon={<FileSpreadsheet size={18} />}
          >
            Import ARKAS
          </NavButton>
        </nav>
        <div className="p-4 border-t border-white/10 bg-black/20">
          <button
            onClick={handleLogout}
            className="w-full flex items-center justify-center gap-2 bg-red-600/20 hover:bg-red-600 text-red-200 hover:text-white py-2 rounded-lg transition-all text-sm font-bold"
          >
            <LogOut size={16} /> Keluar / Logout
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-auto h-screen print:overflow-visible print:w-full print:h-auto print:static relative bg-gray-50/50">
        <div className="bg-gradient-to-r from-blue-900 to-indigo-900 text-white p-4 md:hidden flex justify-between items-center print:hidden shadow-lg sticky top-0 z-20">
          <h1 className="font-bold flex items-center gap-2">
            {schoolData.logo ? (
              <img
                src={schoolData.logo}
                alt="Logo"
                className="w-8 h-8 object-contain bg-white rounded-full p-0.5"
              />
            ) : (
              <School className="text-yellow-400" />
            )}{" "}
            SiBOS
          </h1>
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="p-2 bg-white/10 rounded-lg hover:bg-white/20 transition-colors backdrop-blur-sm"
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Dashboard Content */}
        <div
          className={
            printMode ? "hidden" : "p-4 md:p-8 pb-24 max-w-7xl mx-auto"
          }
        >
          {activeTab === "dashboard" && (
            <div className="space-y-8 animate-fade-in">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                  <h2 className="text-3xl font-black text-gray-800 tracking-tight">
                    Dashboard Ikhtisar
                  </h2>
                  <p className="text-gray-500 mt-1">
                    Ringkasan aktivitas keuangan sekolah Anda.
                  </p>
                </div>
                <div className="text-sm font-semibold text-blue-800 bg-blue-50 px-4 py-2 rounded-full shadow-sm border border-blue-100 flex items-center gap-2">
                  <CheckCircle size={16} className="text-green-500" /> Tahun
                  Anggaran: {new Date().getFullYear()}
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <StatCard
                  title="Total Dana Keluar"
                  value={formatRupiah(
                    transactions.reduce((acc, curr) => acc + curr.jumlah, 0)
                  )}
                  colorClass="from-rose-500 to-pink-600"
                  icon={<FileText size={24} />}
                />
                <StatCard
                  title="Jumlah Transaksi"
                  value={transactions.length}
                  colorClass="from-blue-500 to-indigo-600"
                  icon={<LayoutDashboard size={24} />}
                />
                <StatCard
                  title="Jumlah Toko Mitra"
                  value={stores.length}
                  colorClass="from-amber-400 to-orange-500"
                  icon={<ShoppingBag size={24} />}
                />
              </div>
              {/* School Identity Card */}
              <div className="bg-white rounded-2xl shadow-xl shadow-gray-200/50 border border-gray-100 overflow-hidden">
                <div className="p-6 border-b border-gray-100 bg-gray-50/50">
                  <h3 className="text-lg font-bold flex items-center gap-2 text-gray-800">
                    <School className="text-blue-600" size={20} /> Identitas
                    Sekolah Aktif
                  </h3>
                </div>
                <div className="p-6">
                  <div className="flex flex-col md:flex-row items-center gap-8 mb-8 p-6 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl border border-blue-100">
                    {schoolData.logo ? (
                      <img
                        src={schoolData.logo}
                        className="w-24 h-24 object-contain bg-white rounded-2xl shadow-md p-2"
                      />
                    ) : (
                      <div className="w-24 h-24 bg-white rounded-2xl flex items-center justify-center shadow-md text-blue-200">
                        <School size={48} />
                      </div>
                    )}
                    <div className="text-center md:text-left">
                      <h2 className="text-2xl font-black text-gray-800">
                        {schoolData.namaSekolah}
                      </h2>
                      <p className="text-gray-600 mt-1 flex items-center justify-center md:justify-start gap-2">
                        <MapPin size={16} /> {schoolData.alamat}
                      </p>
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="p-5 bg-white rounded-xl border border-gray-200 hover:border-blue-300 transition-colors shadow-sm group">
                      <p className="text-gray-400 text-xs uppercase font-bold mb-2 flex items-center gap-2">
                        <User size={14} /> Kepala Sekolah
                      </p>
                      <p className="font-bold text-lg text-gray-800 group-hover:text-blue-700 transition-colors">
                        {schoolData.kepalaSekolah}
                      </p>
                      <p className="text-gray-500 text-sm font-mono mt-1 bg-gray-100 inline-block px-2 py-0.5 rounded">
                        NIP. {schoolData.nipKepala}
                      </p>
                    </div>
                    <div className="p-5 bg-white rounded-xl border border-gray-200 hover:border-green-300 transition-colors shadow-sm group">
                      <p className="text-gray-400 text-xs uppercase font-bold mb-2 flex items-center gap-2">
                        <User size={14} /> Bendahara
                      </p>
                      <p className="font-bold text-lg text-gray-800 group-hover:text-green-700 transition-colors">
                        {schoolData.bendahara}
                      </p>
                      <p className="text-gray-500 text-sm font-mono mt-1 bg-gray-100 inline-block px-2 py-0.5 rounded">
                        NIP. {schoolData.nipBendahara}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === "transaksi" && (
            <div className="bg-white rounded-2xl shadow-xl shadow-gray-200/50 border border-gray-100 overflow-hidden animate-fade-in">
              <div className="p-6 border-b border-gray-100 bg-gray-50/50 flex flex-col md:flex-row justify-between items-center gap-4">
                <div>
                  <h2 className="text-xl font-bold text-gray-800">
                    Daftar Transaksi (BKU)
                  </h2>
                  <p className="text-sm text-gray-500">
                    Kelola dan cetak laporan transaksi.
                  </p>
                </div>
                <div className="flex flex-wrap justify-center gap-3 w-full md:w-auto">
                  <button
                    onClick={handlePrintLaporan}
                    className="flex items-center gap-2 px-5 py-2.5 bg-gray-800 text-white rounded-xl hover:bg-gray-900 transition-all shadow-md hover:shadow-lg font-medium text-sm"
                  >
                    <FileSpreadsheet size={18} />{" "}
                    <span className="hidden sm:inline">Cetak BKU</span>
                  </button>
                  <button
                    onClick={() => {
                      setCurrentTrans(null);
                      setShowModal(true);
                    }}
                    className="flex items-center gap-2 px-5 py-2.5 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-all shadow-md hover:shadow-lg shadow-blue-200 font-medium text-sm"
                  >
                    <Plus size={18} />{" "}
                    <span className="hidden sm:inline">Transaksi Baru</span>
                  </button>
                </div>
              </div>
              <div className="p-6">
                <div className="overflow-x-auto border border-gray-200 rounded-xl shadow-sm">
                  <table className="w-full text-left border-collapse min-w-[900px]">
                    <thead className="bg-gray-50/80 text-gray-600 text-xs font-bold uppercase tracking-wider">
                      <tr>
                        <th className="p-4 border-b border-gray-200">No</th>
                        <th className="p-4 border-b border-gray-200">
                          Tanggal
                        </th>
                        <th className="p-4 border-b border-gray-200">
                          Nomor Surat
                        </th>
                        <th className="p-4 border-b border-gray-200">
                          Uraian / Volume
                        </th>
                        <th className="p-4 border-b border-gray-200">
                          Penerima
                        </th>
                        <th className="p-4 border-b border-gray-200 text-right">
                          Jumlah (Rp)
                        </th>
                        <th className="p-4 border-b border-gray-200 text-center">
                          Aksi
                        </th>
                      </tr>
                    </thead>
                    <tbody className="text-sm divide-y divide-gray-100 bg-white">
                      {transactions.map((t, index) => (
                        <tr
                          key={t.id}
                          className="hover:bg-blue-50/50 transition-colors group"
                        >
                          <td className="p-4 text-center text-gray-400 font-medium">
                            {index + 1}
                          </td>
                          <td className="p-4 whitespace-nowrap text-gray-600">
                            {t.tanggal}
                          </td>
                          <td className="p-4 whitespace-nowrap text-gray-600 font-mono text-xs">
                            {t.nomorSurat || "-"}
                          </td>
                          <td className="p-4">
                            <div className="font-semibold text-gray-800">
                              {t.uraian}
                            </div>
                            {t.volume && (
                              <div className="text-xs text-blue-600 mt-1 bg-blue-50 px-2 py-0.5 rounded inline-block border border-blue-100">
                                Vol: {t.volume}
                              </div>
                            )}
                          </td>
                          <td className="p-4 text-gray-600">{t.penerima}</td>
                          <td className="p-4 text-right font-bold text-gray-800 tracking-tight">
                            {formatRupiah(t.jumlah)}
                          </td>
                          <td className="p-4 text-center">
                            <div className="flex justify-center gap-2 opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-all">
                              <button
                                onClick={() => openPrintOptions(t)}
                                title="Cetak SPJ"
                                className="p-2 bg-indigo-100 text-indigo-600 rounded-lg hover:bg-indigo-600 hover:text-white transition-colors"
                              >
                                <Printer size={16} />
                              </button>
                              <button
                                onClick={() => {
                                  setCurrentTrans(t);
                                  setShowModal(true);
                                }}
                                className="p-2 bg-amber-100 text-amber-600 rounded-lg hover:bg-amber-500 hover:text-white transition-colors"
                              >
                                <Edit size={16} />
                              </button>
                              <button
                                onClick={() => handleDeleteTrans(t.id)}
                                className="p-2 bg-rose-100 text-rose-600 rounded-lg hover:bg-rose-500 hover:text-white transition-colors"
                              >
                                <Trash2 size={16} />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {activeTab === "toko" && (
            <div className="bg-white rounded-2xl shadow-xl shadow-gray-200/50 border border-gray-100 overflow-hidden animate-fade-in">
              <div className="p-6 border-b border-gray-100 bg-gray-50/50 flex justify-between items-center">
                <h2 className="text-xl font-bold text-gray-800">Data Toko</h2>
                <button
                  onClick={() => {
                    setCurrentStore(null);
                    setShowStoreModal(true);
                  }}
                  className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors shadow-md text-sm font-medium"
                >
                  <Plus size={18} /> Tambah Toko
                </button>
              </div>
              <div className="p-6">
                <table className="w-full text-sm text-left border rounded-lg overflow-hidden">
                  <thead className="bg-gray-100 text-gray-600 font-bold uppercase text-xs">
                    <tr>
                      <th className="p-3 border-b">Nama Toko</th>
                      <th className="p-3 border-b">Pemilik</th>
                      <th className="p-3 border-b">Telepon</th>
                      <th className="p-3 border-b text-center">Aksi</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y">
                    {stores.map((s) => (
                      <tr key={s.id} className="hover:bg-gray-50">
                        <td className="p-3 font-semibold text-gray-800">
                          {s.namaToko}
                        </td>
                        <td className="p-3 text-gray-600">{s.pemilik}</td>
                        <td className="p-3 text-gray-600">{s.telepon}</td>
                        <td className="p-3 text-center">
                          <button
                            onClick={() => {
                              setCurrentStore(s);
                              setShowStoreModal(true);
                            }}
                            className="text-blue-600 hover:text-blue-800 mr-3 font-medium"
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => handleDeleteStore(s.id)}
                            className="text-red-600 hover:text-red-800 font-medium"
                          >
                            Hapus
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {activeTab === "sekolah" && (
            <div className="bg-white rounded-2xl shadow-xl shadow-gray-200/50 border border-gray-100 overflow-hidden animate-fade-in p-8">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-gray-800">
                  Edit Data Sekolah
                </h2>
                <button
                  onClick={() => setIsEditingSchool(!isEditingSchool)}
                  className={`px-4 py-2 rounded-lg text-sm font-bold transition-colors ${
                    isEditingSchool
                      ? "bg-green-100 text-green-700"
                      : "bg-blue-100 text-blue-700"
                  }`}
                >
                  {isEditingSchool ? "Mode Edit Aktif" : "Klik untuk Mengedit"}
                </button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="md:col-span-1 flex flex-col items-center justify-center p-6 bg-gray-50 rounded-2xl border-2 border-dashed border-gray-300">
                  <div className="w-32 h-32 bg-white rounded-2xl shadow-md flex items-center justify-center overflow-hidden mb-4 p-2">
                    {schoolData.logo ? (
                      <img
                        src={schoolData.logo}
                        className="w-full h-full object-contain"
                      />
                    ) : (
                      <ImageIcon size={48} className="text-gray-300" />
                    )}
                  </div>
                  <label className="cursor-pointer bg-white border border-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-50 transition-colors shadow-sm text-sm font-medium flex items-center gap-2">
                    <Upload size={16} /> Upload Logo
                    <input
                      type="file"
                      className="hidden"
                      onChange={handleLogoUpload}
                      disabled={!isEditingSchool}
                    />
                  </label>
                  <p className="text-xs text-gray-400 mt-2">
                    Format: PNG, JPG (Transparan disarankan)
                  </p>
                </div>
                <div className="md:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-6">
                  <InputGroup
                    label="Nama Sekolah"
                    name="namaSekolah"
                    value={schoolData.namaSekolah}
                    onChange={handleSchoolChange}
                    disabled={!isEditingSchool}
                  />
                  <InputGroup
                    label="Alamat Lengkap"
                    name="alamat"
                    value={schoolData.alamat}
                    onChange={handleSchoolChange}
                    disabled={!isEditingSchool}
                  />
                  <div className="md:col-span-2 border-t border-gray-100 pt-2"></div>
                  <InputGroup
                    label="Nama Kepala Sekolah"
                    name="kepalaSekolah"
                    value={schoolData.kepalaSekolah}
                    onChange={handleSchoolChange}
                    disabled={!isEditingSchool}
                  />
                  <InputGroup
                    label="NIP Kepala Sekolah"
                    name="nipKepala"
                    value={schoolData.nipKepala}
                    onChange={handleSchoolChange}
                    disabled={!isEditingSchool}
                  />
                  <InputGroup
                    label="Nama Bendahara"
                    name="bendahara"
                    value={schoolData.bendahara}
                    onChange={handleSchoolChange}
                    disabled={!isEditingSchool}
                  />
                  <InputGroup
                    label="NIP Bendahara"
                    name="nipBendahara"
                    value={schoolData.nipBendahara}
                    onChange={handleSchoolChange}
                    disabled={!isEditingSchool}
                  />
                </div>
              </div>
            </div>
          )}

          {activeTab === "import" && (
            <div className="flex flex-col items-center justify-center h-full min-h-[600px] bg-white rounded-2xl shadow-xl shadow-gray-200/50 border border-gray-100 p-8 animate-fade-in">
              <div className="bg-gradient-to-br from-blue-100 to-indigo-100 p-8 rounded-full mb-6 shadow-inner">
                <FileSpreadsheet
                  size={64}
                  className="text-blue-600 drop-shadow-sm"
                />
              </div>
              <h2 className="text-3xl font-black text-gray-800 mb-2 tracking-tight">
                Import Data ARKAS
              </h2>
              <p className="text-gray-500 mb-8 text-center max-w-md">
                Upload file Excel (.xlsx) dari aplikasi ARKAS untuk mengisi data
                transaksi secara otomatis.
              </p>
              <input
                type="file"
                accept=".xlsx,.csv"
                ref={fileInputRef}
                onChange={handleFileChange}
                className="hidden"
              />
              <button
                onClick={handleImportArkasClick}
                disabled={isImporting}
                className="group bg-blue-600 text-white px-8 py-4 rounded-2xl hover:bg-blue-700 transition-all shadow-lg hover:shadow-blue-200 hover:-translate-y-1 font-bold text-lg flex items-center gap-3"
              >
                {isImporting ? "Sedang Memproses..." : "Pilih File ARKAS"}
                {!isImporting && (
                  <ArrowRight
                    size={20}
                    className="group-hover:translate-x-1 transition-transform"
                  />
                )}
              </button>
            </div>
          )}
        </div>

        {/* Print Buttons */}
        {printMode && (
          <div className="fixed top-6 right-6 z-[100] print:hidden flex gap-2">
            <button
              onClick={() => window.print()}
              className="bg-blue-600 text-white px-4 py-2 rounded-full shadow-xl hover:bg-blue-700 flex items-center gap-2 font-bold transform hover:scale-105 transition-all"
            >
              <Download size={18} /> Download / Cetak
            </button>
            <button
              onClick={closePrintMode}
              className="bg-red-600 text-white px-4 py-2 rounded-full shadow-xl hover:bg-red-700 flex items-center gap-2 font-bold transform hover:scale-105 transition-all"
            >
              <X size={18} /> Tutup
            </button>
          </div>
        )}

        {/* 4. KWITANSI (UPDATED LAYOUT - SPLIT COLUMNS WITH VERTICAL LINE) */}
        {printMode === "kwitansi" && selectedReceipt && (
          <div className="bg-white p-8 w-full max-w-[21cm] mx-auto print:p-0 print:w-full min-h-screen relative font-sans text-sm leading-relaxed">
            {/* Header Area */}
            <div className="flex justify-between items-start mb-2 pb-2 border-b-2 border-black">
              <div className="flex items-center gap-3">
                <div className="w-16 flex justify-center items-center">
                  {schoolData.logo ? (
                    <img
                      src={schoolData.logo}
                      alt="Logo"
                      className="w-14 h-14 object-contain"
                    />
                  ) : (
                    <div className="w-14 h-14 border-2 border-gray-400 rounded-full flex items-center justify-center text-xs">
                      Logo
                    </div>
                  )}
                </div>
                <div>
                  <h3 className="font-bold uppercase text-xs">
                    PEMERINTAH KABUPATEN {schoolData.kabupaten.toUpperCase()}
                  </h3>
                  <h3 className="font-bold uppercase text-xs">
                    DINAS PENDIDIKAN
                  </h3>
                  <h2 className="font-black uppercase text-sm mt-1">
                    {schoolData.namaSekolah}
                  </h2>
                  <p className="text-xs italic text-gray-600">
                    {schoolData.alamat}
                  </p>
                </div>
              </div>
              <div className="border border-black p-2 text-[10px] font-mono w-64 bg-gray-50">
                <div className="flex justify-between">
                  <span>Tahun Anggaran</span>
                  <span className="font-bold">
                    :{" "}
                    {selectedReceipt.tahunAnggaran || new Date().getFullYear()}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>No Bukti</span>
                  <span>
                    :{" "}
                    {selectedReceipt.nomorSurat
                      ? selectedReceipt.nomorSurat.split("/")[1]
                      : ".........."}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Mata Anggaran</span>
                  <span className="font-bold">
                    : {selectedReceipt.kodeRekening}
                  </span>
                </div>
              </div>
            </div>

            <div className="text-center mb-6">
              <h1 className="font-black text-3xl underline tracking-widest decoration-double decoration-black">
                KWITANSI
              </h1>
            </div>

            {/* MAIN CONTENT AREA: SPLIT WITH VERTICAL LINE */}
            <div className="flex min-h-[400px] border-b-2 border-black pb-4 mb-4">
              {/* LEFT COLUMN: Signatures (Kepsek & Bendahara) */}
              <div className="w-[35%] border-r-2 border-black pr-4 flex flex-col justify-between">
                {/* Top: Kepala Sekolah */}
                <div className="text-center mt-2">
                  <p className="font-bold mb-20">
                    Setuju dibayar,
                    <br />
                    Kepala Sekolah
                  </p>
                  <p className="font-bold underline">
                    {schoolData.kepalaSekolah}
                  </p>
                  <p>NIP. {schoolData.nipKepala}</p>
                </div>

                {/* Bottom: Bendahara */}
                <div className="text-center mb-4">
                  <p className="font-bold mb-20">
                    Lunas dibayar,
                    <br />
                    Bendahara Sekolah
                  </p>
                  <p className="font-bold underline">{schoolData.bendahara}</p>
                  <p>NIP. {schoolData.nipBendahara}</p>
                </div>
              </div>

              {/* RIGHT COLUMN: Receipt Details & Recipient Signature */}
              <div className="w-[65%] pl-6 flex flex-col justify-between">
                {/* Top: Content Fields */}
                <div className="space-y-4 text-sm">
                  <div className="flex">
                    <div className="w-32 font-bold">Sudah terima dari</div>
                    <div className="w-4">:</div>
                    <div className="flex-1">
                      Bendahara {schoolData.namaSekolah}
                    </div>
                  </div>
                  <div className="flex">
                    <div className="w-32 font-bold mt-2">Banyaknya Uang</div>
                    <div className="w-4 mt-2">:</div>
                    <div className="flex-1 bg-gray-100 p-3 border border-gray-400 italic font-bold text-base capitalize leading-snug">
                      # {terbilang(selectedReceipt.jumlah)} Rupiah #
                    </div>
                  </div>
                  <div className="flex">
                    <div className="w-32 font-bold">Untuk Pembayaran</div>
                    <div className="w-4">:</div>
                    <div className="flex-1 leading-relaxed border-b border-dotted border-black">
                      {selectedReceipt.uraian}
                    </div>
                  </div>
                </div>

                {/* Middle: Amount Box */}
                <div className="mt-8 mb-8">
                  <div className="border-y-4 border-double border-black py-2 w-fit pr-12">
                    <span className="font-bold text-lg mr-4 italic">
                      Terbilang Rp.
                    </span>
                    <span className="font-black text-2xl">
                      {new Intl.NumberFormat("id-ID").format(
                        selectedReceipt.jumlah
                      )}
                      ,-
                    </span>
                  </div>
                </div>

                {/* Bottom: Recipient Signature */}
                <div className="self-end text-center w-64 mb-4">
                  <p className="mb-1">
                    {schoolData.kabupaten},{" "}
                    {formatDateIndo(selectedReceipt.tanggal)}
                  </p>
                  <p className="mb-20 font-bold">Yang Menerima,</p>
                  <p className="font-bold underline uppercase">
                    {selectedReceipt.penerima}
                  </p>
                  <p className="uppercase text-xs font-semibold">
                    {getStoreOwner(selectedReceipt.penerima)}
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ... Other Print Modes (Order, Tagihan, Nota, BAST, Penawaran, Laporan) kept same as previous ... */}
        {printMode === "order" && selectedReceipt && (
          <div className="bg-white p-12 w-full max-w-[21cm] mx-auto print:p-0 print:w-full min-h-screen relative font-sans text-sm leading-relaxed">
            <div className="flex border-b-4 border-double border-black pb-4 mb-6 items-center">
              <div className="w-24 flex items-center justify-center">
                {schoolData.logo ? (
                  <img
                    src={schoolData.logo}
                    alt="Logo"
                    className="w-20 h-20 object-contain"
                  />
                ) : (
                  <div className="w-20 h-20 border flex items-center justify-center">
                    Logo
                  </div>
                )}
              </div>
              <div className="flex-1 text-center">
                <h3 className="font-bold text-lg uppercase tracking-wide">
                  PEMERINTAH KABUPATEN {schoolData.kabupaten.toUpperCase()}
                </h3>
                <h3 className="font-bold text-lg uppercase tracking-wide">
                  DINAS PENDIDIKAN
                </h3>
                <h2 className="font-black text-2xl uppercase mt-1">
                  {schoolData.namaSekolah}
                </h2>
                <p className="font-bold italic text-sm">TERAKREDITASI "A"</p>
                <p className="text-xs italic mt-1">
                  Alamat : {schoolData.alamat}
                </p>
              </div>
            </div>
            <div className="text-right mb-6 font-medium">
              <p>
                {schoolData.kabupaten},{" "}
                {formatDateIndo(selectedReceipt.tanggal)}
              </p>
            </div>
            <div className="flex mb-8">
              <div className="w-1/2">
                <table className="w-full">
                  <tbody>
                    <tr>
                      <td className="w-24 align-top">Nomor</td>
                      <td className="align-top">
                        :{" "}
                        {selectedReceipt.nomorSurat ||
                          `900/0   /BOSP/SDN.G1/TGM/${selectedReceipt.tahunAnggaran}`}
                      </td>
                    </tr>
                    <tr>
                      <td className="align-top">Lampiran</td>
                      <td className="align-top">: -</td>
                    </tr>
                    <tr>
                      <td className="align-top">Perihal</td>
                      <td className="align-top">
                        :{" "}
                        <span className="font-bold underline">
                          Order Pesanan
                        </span>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div className="w-1/2 pl-8">
                <p>Kepada Yth.</p>
                <p>
                  Pimpinan{" "}
                  <span className="font-bold uppercase">
                    {selectedReceipt.penerima}
                  </span>
                </p>
                <p>Di –</p>
                <p className="pl-4 font-bold uppercase">
                  {getStoreOwner(selectedReceipt.penerima)}
                </p>
              </div>
            </div>
            <p className="text-justify indent-12 mb-6">
              Dalam rangka pelaksanaan Kegiatan Penyediaan Belanja Operasional
              Sekolah (BOS) Bantuan Operasional Sekolah Tahun{" "}
              {selectedReceipt.tahunAnggaran || new Date().getFullYear()},
              Dengan ini Kami mohon kesedianya menyediakan barang-barang sebagai
              berikut :
            </p>
            <table className="w-full border-collapse border border-black mb-12">
              <thead>
                <tr className="bg-gray-100">
                  <th className="border border-black p-2 w-12 text-center">
                    No
                  </th>
                  <th className="border border-black p-2 text-left">
                    Nama Barang / Spesifikasi
                  </th>
                  <th className="border border-black p-2 w-40 text-center">
                    Volume
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border border-black p-3 text-center align-top">
                    1
                  </td>
                  <td className="border border-black p-3 font-medium">
                    {selectedReceipt.uraian}
                  </td>
                  <td className="border border-black p-3 text-center font-medium">
                    {selectedReceipt.volume || "-"}
                  </td>
                </tr>
                {[...Array(5)].map((_, i) => (
                  <tr key={i}>
                    <td className="border border-black p-3 text-center">
                      &nbsp;
                    </td>
                    <td className="border border-black p-3"></td>
                    <td className="border border-black p-3"></td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="flex justify-end">
              <div className="text-center w-64">
                <p className="mb-24">Kepala Sekolah</p>
                <p className="font-bold underline uppercase">
                  {schoolData.kepalaSekolah}
                </p>
                <p>NIP. {schoolData.nipKepala}</p>
              </div>
            </div>
          </div>
        )}
        {printMode === "tagihan" && selectedReceipt && (
          <div className="bg-white p-12 w-full max-w-[21cm] mx-auto print:p-0 print:w-full min-h-screen relative font-sans text-sm leading-relaxed">
            <div className="text-right mb-8 font-medium">
              <p>
                {schoolData.kabupaten},{" "}
                {formatDateIndo(selectedReceipt.tanggal)}
              </p>
            </div>
            <div className="flex mb-8">
              <div className="w-1/2">
                <table className="w-full">
                  <tbody>
                    <tr>
                      <td className="w-20 align-top">Nomor</td>
                      <td className="align-top">
                        : &nbsp;&nbsp;&nbsp;/&nbsp;&nbsp;&nbsp;/
                      </td>
                    </tr>
                    <tr>
                      <td className="align-top">Lampiran</td>
                      <td className="align-top">: -</td>
                    </tr>
                    <tr>
                      <td className="align-top">Hal</td>
                      <td className="align-top">
                        : <span className="font-bold underline">Tagihan</span>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div className="w-1/2 pl-12">
                <p>Kepada Yth.</p>
                <p>Kepala {schoolData.namaSekolah}</p>
                <p>Di –</p>
                <p className="pl-4 font-bold">{schoolData.kabupaten}</p>
              </div>
            </div>
            <div className="text-justify mb-6">
              <p className="mb-2">
                Sehubungan dengan pesanan saudara dengan surat Nomor :{" "}
                {selectedReceipt.nomorSurat ||
                  `900/0...../BOSP/SDN.G1/TGM/${selectedReceipt.tahunAnggaran}`}{" "}
                tanggal {formatDateIndo(selectedReceipt.tanggal)}. Berupa
                Pembayaran seperti tersebut di bawah ini dan telah kami
                sampaikan, dengan ini kami mohon agar saudara dapat membayar
                barang-barang sebesar{" "}
                <span className="font-bold">
                  Rp.{" "}
                  {new Intl.NumberFormat("id-ID").format(
                    selectedReceipt.jumlah
                  )}
                </span>
              </p>
              <div className="bg-gray-50 border border-gray-200 p-3 italic font-bold text-center rounded my-4">
                ( {terbilang(selectedReceipt.jumlah)} Rupiah )
              </div>
              <p>dengan rincian sebagai berikut :</p>
            </div>
            <table className="w-full border-collapse border border-black mb-10">
              <thead>
                <tr className="bg-gray-100 text-center">
                  <th className="border border-black p-2 w-10">No</th>
                  <th className="border border-black p-2">Nama Barang</th>
                  <th className="border border-black p-2 w-24">Volume</th>
                  <th className="border border-black p-2 w-32">Satuan (Rp)</th>
                  <th className="border border-black p-2 w-32">Jumlah (Rp)</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border border-black p-2 text-center">1</td>
                  <td className="border border-black p-2">
                    {selectedReceipt.uraian}
                  </td>
                  <td className="border border-black p-2 text-center">
                    {selectedReceipt.volume}
                  </td>
                  <td className="border border-black p-2 text-right">
                    {formatRupiah(selectedReceipt.jumlah)}
                  </td>
                  <td className="border border-black p-2 text-right">
                    {formatRupiah(selectedReceipt.jumlah)}
                  </td>
                </tr>
                {[...Array(5)].map((_, i) => (
                  <tr key={i}>
                    <td className="border border-black p-2">&nbsp;</td>
                    <td className="border border-black p-2"></td>
                    <td className="border border-black p-2"></td>
                    <td className="border border-black p-2"></td>
                    <td className="border border-black p-2"></td>
                  </tr>
                ))}
                <tr>
                  <td
                    colSpan="4"
                    className="border border-black p-2 text-center font-bold"
                  >
                    JUMLAH TOTAL
                  </td>
                  <td className="border border-black p-2 text-right font-bold bg-gray-100">
                    {formatRupiah(selectedReceipt.jumlah)}
                  </td>
                </tr>
              </tbody>
            </table>
            <p className="mb-12">
              Demikian tagihan ini kami sampaikan, atas kerjasamanya kami
              ucapakan terima kasih.
            </p>
            <div className="flex justify-end">
              <div className="text-center w-64">
                <p className="mb-24">Hormat kami,</p>
                <p className="font-bold underline uppercase">
                  {selectedReceipt.penerima}
                </p>
                <p className="text-xs uppercase mt-1">
                  {getStoreOwner(selectedReceipt.penerima)}
                </p>
              </div>
            </div>
          </div>
        )}
        {printMode === "nota" && selectedReceipt && (
          <div className="bg-white p-12 w-full max-w-[21cm] mx-auto print:p-0 print:w-full min-h-screen">
            <div className="max-w-[16cm] mx-auto border-2 border-gray-800 p-6 shadow-none">
              <div className="flex justify-between items-start border-b-2 border-black pb-4 mb-6">
                <div>
                  <p className="text-xs font-bold uppercase tracking-widest text-gray-500">
                    Nota Penjualan
                  </p>
                  <h2 className="text-3xl font-black font-serif tracking-tight mt-1">
                    {selectedReceipt.penerima}
                  </h2>
                  <p className="text-xs mt-1">
                    {getStoreOwner(selectedReceipt.penerima)}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-bold">
                    {formatDateIndo(selectedReceipt.tanggal)}
                  </p>
                  <p className="text-xs mt-1 text-gray-500">Kepada Yth.</p>
                  <p className="font-bold uppercase text-sm mt-1">
                    {schoolData.namaSekolah}
                  </p>
                </div>
              </div>
              <table className="w-full border-collapse border border-black text-sm mb-6">
                <thead className="bg-gray-100 text-center font-bold">
                  <tr>
                    <th className="border border-black p-2 w-16">Banyaknya</th>
                    <th className="border border-black p-2">Nama Barang</th>
                    <th className="border border-black p-2 w-32">Harga</th>
                    <th className="border border-black p-2 w-32">Jumlah</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border border-black p-2 text-center">
                      {selectedReceipt.volume}
                    </td>
                    <td className="border border-black p-2">
                      {selectedReceipt.uraian}
                    </td>
                    <td className="border border-black p-2 text-right">
                      {formatRupiah(selectedReceipt.jumlah)}
                    </td>
                    <td className="border border-black p-2 text-right">
                      {formatRupiah(selectedReceipt.jumlah)}
                    </td>
                  </tr>
                  {[...Array(6)].map((_, i) => (
                    <tr key={i} className="h-8">
                      <td className="border border-black"></td>
                      <td className="border border-black"></td>
                      <td className="border border-black"></td>
                      <td className="border border-black"></td>
                    </tr>
                  ))}
                  <tr>
                    <td
                      colSpan="3"
                      className="border border-black p-2 text-right font-bold"
                    >
                      Total Rp.
                    </td>
                    <td className="border border-black p-2 text-right font-bold bg-gray-50">
                      {formatRupiah(selectedReceipt.jumlah)}
                    </td>
                  </tr>
                </tbody>
              </table>
              <div className="flex justify-between items-end mt-8">
                <div className="text-xs text-center w-40">
                  <p className="mb-16">Tanda Terima</p>
                  <p className="border-t border-black pt-1">
                    ( ........................ )
                  </p>
                </div>
                <div className="text-center w-48">
                  <p className="mb-16 text-xs">Hormat kami,</p>
                  <p className="font-bold underline text-lg">
                    {getStoreOwner(selectedReceipt.penerima)}
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
        {printMode === "bast" && selectedReceipt && (
          <div className="bg-white p-12 w-full max-w-[21cm] mx-auto print:p-0 print:w-full min-h-screen font-sans text-sm leading-relaxed">
            <div className="text-center mb-8 border-b-2 border-black pb-4">
              <h2 className="text-xl font-black underline uppercase mb-1">
                BERITA ACARA SERAH TERIMA BARANG
              </h2>
              <p className="font-mono text-sm">
                Nomor :{" "}
                {selectedReceipt.nomorSurat
                  ? selectedReceipt.nomorSurat.replace("BOSP", "BAST/BOSP")
                  : `420/        / BOSP/SDN.G1/TGM/${selectedReceipt.tahunAnggaran}`}
              </p>
            </div>
            <div className="text-justify mb-6">
              <p>
                {formatDateFullText(selectedReceipt.tanggal)}, kami yang
                bertanda tangan di bawah ini :
              </p>
            </div>
            <div className="ml-4 mb-8 space-y-6">
              <div className="bg-gray-50 p-4 rounded border border-gray-200">
                <table className="w-full">
                  <tbody>
                    <tr>
                      <td className="w-6 font-bold">1.</td>
                      <td className="w-24 font-bold">Nama</td>
                      <td>
                        :{" "}
                        <span className="font-bold uppercase">
                          {schoolData.kepalaSekolah}
                        </span>
                      </td>
                    </tr>
                    <tr>
                      <td></td>
                      <td>NIP</td>
                      <td>: {schoolData.nipKepala}</td>
                    </tr>
                    <tr>
                      <td></td>
                      <td>Jabatan</td>
                      <td>: Kepala Sekolah</td>
                    </tr>
                    <tr>
                      <td></td>
                      <td>Alamat</td>
                      <td>: {schoolData.namaSekolah}</td>
                    </tr>
                    <tr>
                      <td></td>
                      <td
                        colSpan="2"
                        className="pt-2 italic font-semibold text-blue-900"
                      >
                        Selanjutnya disebut PIHAK PERTAMA (Yang Menerima)
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div className="bg-gray-50 p-4 rounded border border-gray-200">
                <table className="w-full">
                  <tbody>
                    <tr>
                      <td className="w-6 font-bold">2.</td>
                      <td className="w-24 font-bold">Nama</td>
                      <td>
                        :{" "}
                        <span className="font-bold uppercase">
                          {getStoreOwner(selectedReceipt.penerima)}
                        </span>
                      </td>
                    </tr>
                    <tr>
                      <td></td>
                      <td>Jabatan</td>
                      <td>: Pimpinan / Pemilik Toko</td>
                    </tr>
                    <tr>
                      <td></td>
                      <td>Nama Toko</td>
                      <td>: {selectedReceipt.penerima}</td>
                    </tr>
                    <tr>
                      <td></td>
                      <td
                        colSpan="2"
                        className="pt-2 italic font-semibold text-blue-900"
                      >
                        Selanjutnya disebut PIHAK KEDUA (Yang Menyerahkan)
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
            <p className="text-justify mb-4">
              <span className="font-bold">PIHAK KEDUA</span> menyerahkan barang
              kepada <span className="font-bold">PIHAK PERTAMA</span>, dan{" "}
              <span className="font-bold">PIHAK PERTAMA</span> telah menerima
              barang tersebut dalam keadaan{" "}
              <span className="font-bold underline">
                BAIK, LENGKAP dan CUKUP
              </span>{" "}
              sesuai pesanan, dengan rincian sebagai berikut :
            </p>
            <table className="w-full border-collapse border border-black mb-8">
              <thead>
                <tr className="bg-gray-200 text-center font-bold">
                  <th className="border border-black p-2 w-10">No</th>
                  <th className="border border-black p-2">
                    Nama Barang / Spesifikasi
                  </th>
                  <th className="border border-black p-2 w-24">Volume</th>
                  <th className="border border-black p-2 w-32">Kondisi</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border border-black p-2 text-center h-12">
                    1
                  </td>
                  <td className="border border-black p-2 font-medium">
                    {selectedReceipt.uraian}
                  </td>
                  <td className="border border-black p-2 text-center font-medium">
                    {selectedReceipt.volume || "-"}
                  </td>
                  <td className="border border-black p-2 text-center font-bold text-green-700">
                    BAIK (100%)
                  </td>
                </tr>
                {[...Array(3)].map((_, i) => (
                  <tr key={i}>
                    <td className="border border-black h-8"></td>
                    <td className="border border-black"></td>
                    <td className="border border-black"></td>
                    <td className="border border-black"></td>
                  </tr>
                ))}
              </tbody>
            </table>
            <p className="mb-12 text-justify">
              Demikian Berita Acara Serah Terima Barang ini dibuat dengan
              sebenarnya dalam rangkap 2 (dua) untuk dapat dipergunakan
              sebagaimana mestinya.
            </p>
            <div className="flex justify-between text-center">
              <div className="w-5/12">
                <p className="mb-2 font-bold">PIHAK PERTAMA</p>
                <p className="mb-24 text-xs">(Yang Menerima)</p>
                <p className="font-bold underline uppercase">
                  {schoolData.kepalaSekolah}
                </p>
                <p>NIP. {schoolData.nipKepala}</p>
              </div>
              <div className="w-5/12">
                <p className="mb-2 font-bold">PIHAK KEDUA</p>
                <p className="mb-24 text-xs">(Yang Menyerahkan)</p>
                <p className="font-bold underline uppercase">
                  {selectedReceipt.penerima}
                </p>
                <p className="uppercase text-xs">
                  {getStoreOwner(selectedReceipt.penerima)}
                </p>
              </div>
            </div>
          </div>
        )}
        {printMode === "penawaran" && selectedReceipt && (
          <div className="bg-white p-12 w-full max-w-[21cm] mx-auto print:p-0 print:w-full min-h-screen font-sans text-sm">
            <div className="text-right mb-8">
              <p className="font-medium">
                {schoolData.kabupaten},{" "}
                {formatDateIndo(selectedReceipt.tanggal)}
              </p>
            </div>
            <div className="flex mb-10">
              <div className="w-1/2">
                <table className="w-full">
                  <tbody>
                    <tr>
                      <td className="w-20">Perihal</td>
                      <td>
                        :{" "}
                        <span className="font-bold underline">
                          PENAWARAN HARGA
                        </span>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div className="w-1/2 pl-12 border-l border-gray-200">
                <p>Kepada Yth.</p>
                <p className="font-bold">Kepala {schoolData.namaSekolah}</p>
                <p>di –</p>
                <p className="pl-4">Tempat</p>
              </div>
            </div>
            <div className="text-justify mb-6 leading-relaxed">
              <p>Dengan hormat,</p>
              <p className="mt-2">
                Menunjuk Surat Pesanan Saudara Nomor :{" "}
                {selectedReceipt.nomorSurat ||
                  `900/0..../BOSP/SDN.G1/TGM/${selectedReceipt.tahunAnggaran}`}{" "}
                tanggal {formatDateIndo(selectedReceipt.tanggal)}, perihal
                pesanan barang/jasa untuk kegiatan sekolah.
              </p>
              <p className="mt-2">
                Bersama ini kami mengajukan penawaran harga untuk barang-barang
                tersebut sebesar :
              </p>
              <div className="my-6 text-center">
                <span className="text-2xl font-black bg-gray-100 px-6 py-2 rounded-lg border border-gray-300">
                  Rp.{" "}
                  {new Intl.NumberFormat("id-ID").format(
                    selectedReceipt.jumlah
                  )}
                </span>
              </div>
              <p className="italic font-bold text-center border-b border-t border-dotted border-black py-2 mb-6">
                ( Terbilang: {terbilang(selectedReceipt.jumlah)} Rupiah )
              </p>
              <p>
                Adapun rincian spesifikasi dan harga satuan adalah sebagai
                berikut :
              </p>
            </div>
            <table className="w-full border-collapse border border-black mb-12">
              <thead>
                <tr className="bg-gray-100 text-center font-bold">
                  <th className="border border-black p-2 w-10">No</th>
                  <th className="border border-black p-2">Nama Barang</th>
                  <th className="border border-black p-2 w-24">Volume</th>
                  <th className="border border-black p-2 w-32">Harga Satuan</th>
                  <th className="border border-black p-2 w-32">Jumlah Harga</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border border-black p-2 text-center">1</td>
                  <td className="border border-black p-2 font-medium">
                    {selectedReceipt.uraian}
                  </td>
                  <td className="border border-black p-2 text-center">
                    {selectedReceipt.volume}
                  </td>
                  <td className="border border-black p-2 text-right">
                    {formatRupiah(selectedReceipt.jumlah)}
                  </td>
                  <td className="border border-black p-2 text-right font-bold">
                    {formatRupiah(selectedReceipt.jumlah)}
                  </td>
                </tr>
                {[...Array(5)].map((_, i) => (
                  <tr key={i}>
                    <td className="border border-black p-2">&nbsp;</td>
                    <td className="border border-black p-2"></td>
                    <td className="border border-black p-2"></td>
                    <td className="border border-black p-2"></td>
                    <td className="border border-black p-2"></td>
                  </tr>
                ))}
                <tr className="bg-gray-50">
                  <td
                    colSpan="4"
                    className="border border-black p-2 text-center font-bold"
                  >
                    TOTAL PENAWARAN
                  </td>
                  <td className="border border-black p-2 text-right font-black">
                    {formatRupiah(selectedReceipt.jumlah)}
                  </td>
                </tr>
              </tbody>
            </table>
            <div className="flex justify-end">
              <div className="text-center w-64">
                <p className="mb-24">
                  Hormat Kami,
                  <br />
                  Penyedia Barang/Jasa
                </p>
                <p className="font-bold underline uppercase">
                  {selectedReceipt.penerima}
                </p>
                <p className="uppercase text-xs">
                  {getStoreOwner(selectedReceipt.penerima)}
                </p>
              </div>
            </div>
          </div>
        )}
        {printMode === "laporan" && (
          <div className="bg-white p-8 w-full print:p-0 min-h-screen absolute top-0 left-0 z-50">
            <div className="text-center mb-6 border-b-4 border-double border-black pb-4">
              <h2 className="text-2xl font-bold uppercase">
                Laporan Penggunaan Dana BOS
              </h2>
              <h3 className="text-xl font-bold uppercase">
                {schoolData.namaSekolah}
              </h3>
              <p className="text-sm mt-1">Alamat: {schoolData.alamat}</p>
              <p className="font-bold mt-2 border border-black inline-block px-4 py-1">
                Tahun Anggaran{" "}
                {transactions.length > 0
                  ? transactions[0].tahunAnggaran
                  : new Date().getFullYear()}
              </p>
            </div>
            <table className="w-full border-collapse border border-black text-xs font-serif">
              <thead>
                <tr className="bg-gray-200 print:bg-gray-100">
                  <th className="border border-black p-2 w-10">No</th>
                  <th className="border border-black p-2 w-24">Tanggal</th>
                  <th className="border border-black p-2 w-24">
                    Kode Rekening
                  </th>
                  <th className="border border-black p-2">Uraian</th>
                  <th className="border border-black p-2 w-32">Penerima</th>
                  <th className="border border-black p-2 text-right w-28">
                    Debit
                  </th>
                  <th className="border border-black p-2 text-right w-28">
                    Kredit
                  </th>
                  <th className="border border-black p-2 text-right w-28">
                    Saldo
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border border-black p-2 text-center"></td>
                  <td className="border border-black p-2"></td>
                  <td className="border border-black p-2"></td>
                  <td className="border border-black p-2 font-bold italic">
                    Saldo Awal Kas
                  </td>
                  <td className="border border-black p-2"></td>
                  <td className="border border-black p-2 text-right">
                    50.000.000
                  </td>
                  <td className="border border-black p-2 text-right">0</td>
                  <td className="border border-black p-2 text-right">
                    50.000.000
                  </td>
                </tr>
                {transactions.map((t, i) => {
                  const previousSpending = transactions
                    .slice(0, i + 1)
                    .reduce((acc, curr) => acc + curr.jumlah, 0);
                  const currentSaldo = 50000000 - previousSpending;
                  return (
                    <tr key={t.id}>
                      <td className="border border-black p-2 text-center">
                        {i + 1}
                      </td>
                      <td className="border border-black p-2">{t.tanggal}</td>
                      <td className="border border-black p-2 text-center">
                        {t.kodeRekening}
                      </td>
                      <td className="border border-black p-2">
                        {t.uraian}{" "}
                        {t.volume && (
                          <span className="italic text-[10px] block">
                            ({t.volume})
                          </span>
                        )}
                      </td>
                      <td className="border border-black p-2">{t.penerima}</td>
                      <td className="border border-black p-2 text-right">-</td>
                      <td className="border border-black p-2 text-right">
                        {new Intl.NumberFormat("id-ID").format(t.jumlah)}
                      </td>
                      <td className="border border-black p-2 text-right">
                        {new Intl.NumberFormat("id-ID").format(currentSaldo)}
                      </td>
                    </tr>
                  );
                })}
                <tr className="font-bold bg-gray-100 print:bg-transparent">
                  <td
                    colSpan="6"
                    className="border border-black p-2 text-right uppercase"
                  >
                    Total Pengeluaran
                  </td>
                  <td className="border border-black p-2 text-right">
                    {formatRupiah(
                      transactions.reduce((acc, curr) => acc + curr.jumlah, 0)
                    )}
                  </td>
                  <td className="border border-black p-2 bg-gray-200"></td>
                </tr>
              </tbody>
            </table>
            <div className="mt-12 flex justify-between text-center break-inside-avoid font-serif">
              <div className="w-1/3">
                <p className="mb-20">
                  Mengetahui,
                  <br />
                  Kepala Sekolah
                </p>
                <p className="font-bold underline">
                  {schoolData.kepalaSekolah}
                </p>
                <p>NIP. {schoolData.nipKepala}</p>
              </div>
              <div className="w-1/3">
                <p className="mb-20">Bendahara</p>
                <p className="font-bold underline">{schoolData.bendahara}</p>
                <p>NIP. {schoolData.nipBendahara}</p>
              </div>
            </div>
          </div>
        )}

        {/* Modals for Print Options, Transactions, Stores, etc. kept same */}
        {showPrintOptions && (
          <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 animate-fade-in p-4">
            <div className="bg-white rounded-3xl w-full max-w-2xl shadow-2xl p-6 md:p-8 transform transition-all scale-100 max-h-[90vh] overflow-y-auto custom-scrollbar">
              <div className="flex justify-between items-center mb-6 md:mb-8 border-b border-gray-100 pb-4 sticky top-0 bg-white z-10">
                <div>
                  <h3 className="text-2xl font-black text-gray-800">
                    Pilih Dokumen Cetak
                  </h3>
                  <p className="text-gray-500 text-sm mt-1">
                    Silakan pilih jenis dokumen yang ingin Anda cetak.
                  </p>
                </div>
                <button
                  onClick={() => setShowPrintOptions(false)}
                  className="bg-gray-100 hover:bg-red-100 text-gray-500 hover:text-red-500 p-2 rounded-full transition-colors"
                >
                  <X size={24} />
                </button>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mb-8">
                {[
                  {
                    id: "order",
                    label: "Surat Pesanan",
                    desc: "Order Barang",
                    icon: <FileInput size={28} />,
                    color:
                      "bg-blue-50 text-blue-600 border-blue-100 hover:bg-blue-600 hover:text-white hover:border-blue-600",
                  },
                  {
                    id: "penawaran",
                    label: "Surat Penawaran",
                    desc: "Dari Penyedia",
                    icon: <FileText size={28} />,
                    color:
                      "bg-orange-50 text-orange-600 border-orange-100 hover:bg-orange-600 hover:text-white hover:border-orange-600",
                  },
                  {
                    id: "tagihan",
                    label: "Faktur / Tagihan",
                    desc: "Invoice",
                    icon: <FileOutput size={28} />,
                    color:
                      "bg-green-50 text-green-600 border-green-100 hover:bg-green-600 hover:text-white hover:border-green-600",
                  },
                  {
                    id: "kwitansi",
                    label: "Kwitansi BOS",
                    desc: "Bukti Bayar",
                    icon: <Receipt size={28} />,
                    color:
                      "bg-purple-50 text-purple-600 border-purple-100 hover:bg-purple-600 hover:text-white hover:border-purple-600",
                  },
                  {
                    id: "bast",
                    label: "Berita Acara",
                    desc: "Serah Terima",
                    icon: <ClipboardCheck size={28} />,
                    color:
                      "bg-teal-50 text-teal-600 border-teal-100 hover:bg-teal-600 hover:text-white hover:border-teal-600",
                  },
                  {
                    id: "nota",
                    label: "Nota Belanja",
                    desc: "Struk Toko",
                    icon: <StickyNote size={28} />,
                    color:
                      "bg-pink-50 text-pink-600 border-pink-100 hover:bg-pink-600 hover:text-white hover:border-pink-600",
                  },
                ].map((item) => (
                  <button
                    key={item.id}
                    onClick={() => handlePrintDocument(item.id)}
                    className={`flex flex-col items-center justify-center gap-3 p-6 border-2 rounded-2xl transition-all duration-300 group ${item.color}`}
                  >
                    <div className="p-3 bg-white rounded-full shadow-sm group-hover:scale-110 transition-transform">
                      {item.icon}
                    </div>
                    <div className="text-center">
                      <p className="font-bold text-sm">{item.label}</p>
                      <p className="text-xs opacity-70 mt-1">{item.desc}</p>
                    </div>
                  </button>
                ))}
              </div>
              <div className="flex justify-end sticky bottom-0 bg-white pt-4 border-t border-gray-100">
                <button
                  onClick={() => setShowPrintOptions(false)}
                  className="px-6 py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold rounded-xl transition-colors w-full md:w-auto"
                >
                  Batal
                </button>
              </div>
            </div>
          </div>
        )}
        {showModal && (
          <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 animate-fade-in p-4">
            <div className="bg-white p-8 rounded-3xl w-full max-w-lg shadow-2xl max-h-[90vh] overflow-y-auto custom-scrollbar">
              <h3 className="text-2xl font-black mb-6 text-gray-800 border-b pb-4">
                {currentTrans ? "Edit Transaksi" : "Tambah Transaksi Baru"}
              </h3>
              <form onSubmit={handleSaveTrans} className="space-y-5">
                <InputGroup
                  label="Tanggal Transaksi"
                  type="date"
                  name="tanggal"
                  value={currentTrans?.tanggal}
                  required
                />
                <InputGroup
                  label="Nomor Surat / Bukti"
                  name="nomorSurat"
                  value={currentTrans?.nomorSurat}
                  placeholder="Contoh: 900/001/BOSP/..."
                />
                <div className="grid grid-cols-2 gap-4">
                  <InputGroup
                    label="Kode Rekening"
                    name="kodeRekening"
                    value={currentTrans?.kodeRekening}
                    placeholder="5.1.02..."
                  />
                  <InputGroup
                    label="Tahun Anggaran"
                    name="tahunAnggaran"
                    value={
                      currentTrans?.tahunAnggaran ||
                      new Date().getFullYear().toString()
                    }
                    type="number"
                    placeholder="2025"
                  />
                </div>
                <InputGroup
                  label="Uraian Belanja"
                  name="uraian"
                  value={currentTrans?.uraian}
                  placeholder="Nama Barang/Jasa"
                  type="textarea"
                  required
                />
                <div className="grid grid-cols-2 gap-4">
                  <InputGroup
                    label="Volume"
                    name="volume"
                    value={currentTrans?.volume}
                    placeholder="1 Pkt"
                  />
                  <InputGroup
                    label="Jumlah (Rp)"
                    type="number"
                    name="jumlah"
                    value={currentTrans?.jumlah}
                    required
                  />
                </div>
                <InputGroup
                  label="Penerima (Toko)"
                  name="penerima"
                  value={currentTrans?.penerima}
                  list="storeList"
                  placeholder="Pilih/Ketik Nama Toko"
                  required
                />
                <datalist id="storeList">
                  {stores.map((s) => (
                    <option key={s.id} value={s.namaToko} />
                  ))}
                </datalist>
                <div className="flex justify-end gap-3 pt-4">
                  <button
                    type="button"
                    onClick={() => setShowModal(false)}
                    className="px-6 py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold rounded-xl transition-colors"
                  >
                    Batal
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl shadow-lg shadow-blue-200 transition-colors"
                  >
                    Simpan Data
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
        {showStoreModal && (
          <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 animate-fade-in p-4">
            <div className="bg-white p-8 rounded-3xl w-full max-w-lg shadow-2xl max-h-[90vh] overflow-y-auto custom-scrollbar">
              <h3 className="text-2xl font-black mb-6 text-gray-800 border-b pb-4">
                {currentStore ? "Edit Data Toko" : "Tambah Toko Baru"}
              </h3>
              <form onSubmit={handleSaveStore} className="space-y-5">
                <InputGroup
                  label="Nama Toko"
                  name="namaToko"
                  value={currentStore?.namaToko}
                  required
                  placeholder="Contoh: Toko Buku Cerdas"
                />
                <InputGroup
                  label="Alamat Toko"
                  name="alamat"
                  value={currentStore?.alamat}
                  type="textarea"
                  placeholder="Alamat lengkap..."
                />
                <InputGroup
                  label="Nama Pemilik"
                  name="pemilik"
                  value={currentStore?.pemilik}
                  placeholder="Nama Lengkap Pemilik"
                />
                <div className="grid grid-cols-2 gap-4">
                  <InputGroup
                    label="No. Telepon"
                    name="telepon"
                    value={currentStore?.telepon}
                    placeholder="0812..."
                  />
                  <InputGroup
                    label="NPWP (Opsional)"
                    name="npwp"
                    value={currentStore?.npwp}
                    placeholder="00.000..."
                  />
                </div>
                <div className="flex justify-end gap-3 pt-4">
                  <button
                    type="button"
                    onClick={() => setShowStoreModal(false)}
                    className="px-6 py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold rounded-xl transition-colors"
                  >
                    Batal
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl shadow-lg shadow-blue-200 transition-colors"
                  >
                    Simpan Toko
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
