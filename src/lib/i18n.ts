
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

const resources = {
  en: {
    translation: {
      // Navigation
      "dashboard": "Dashboard",
      "prescriptions": "Prescriptions",
      "inventory": "Inventory",
      "products": "Products",
      "suppliers": "Suppliers",
      "pharmacies": "Pharmacies",
      "payments": "Payments",
      "promotions": "Promotions",
      "analytics": "Analytics",
      "customers": "Customers",
      "messages": "Messages",
      "settings": "Settings",
      "security": "Security",
      "backup": "Backup",
      "synchronization": "Synchronization",
      
      // Common actions
      "add": "Add",
      "edit": "Edit",
      "delete": "Delete",
      "save": "Save",
      "cancel": "Cancel",
      "search": "Search",
      "export": "Export",
      "import": "Import",
      "login": "Login",
      "logout": "Logout",
      "register": "Register",
      "submit": "Submit",
      "close": "Close",
      "view": "View",
      "order": "Order",
      "place_order": "Place Order",
      
      // Dashboard
      "welcome": "Welcome to MedLocs",
      "total_products": "Total Products",
      "products_in_stock": "Products in stock",
      "low_stock_alerts": "Low Stock Alerts",
      "products_to_order": "Products to order",
      "stock_value": "Stock Value",
      "total_inventory_value": "Total inventory value",
      "pending_prescriptions": "23 pending processing",
      "5_low_stock": "5 products low in stock",
      "current_month": "For current month",
      "new_this_month": "32 new this month",
      "sales": "Sales",
      "clients": "Clients",
      
      // Inventory
      "inventory_management": "Inventory Management",
      "add_product": "Add Product",
      "product_list": "Product List",
      "manage_inventory": "Manage your medication and product inventory",
      "search_product": "Search for a product...",
      "name": "Name",
      "category": "Category",
      "stock": "Stock",
      "price": "Price",
      "actions": "Actions",
      "units": "units",
      "no_products_found": "No products found for the specified criteria.",
      
      // Orders
      "orders": "Orders",
      "order_management": "Order Management",
      "new_order": "New Order",
      "order_history": "Order History",
      "pending_orders": "Pending Orders",
      "order_status": "Order Status",
      "supplier": "Supplier",
      "order_date": "Order Date",
      "total_amount": "Total Amount",
      "status": "Status",
      "pending": "Pending",
      "confirmed": "Confirmed",
      "shipped": "Shipped",
      "delivered": "Delivered",
      "cancelled": "Cancelled",
      
      // Authentication
      "sign_in": "Sign In",
      "sign_up": "Sign Up",
      "email": "Email",
      "password": "Password",
      "confirm_password": "Confirm Password",
      "forgot_password": "Forgot Password?",
      "remember_me": "Remember me",
      "dont_have_account": "Don't have an account?",
      "already_have_account": "Already have an account?",
      "create_account": "Create Account",
      "sign_in_to_account": "Sign in to your account",
      "create_new_account": "Create a new account",
      
      // Pharmacies
      "pharmacy_management": "Pharmacy Management",
      "add_pharmacy": "Add Pharmacy",
      "pharmacy_list": "Pharmacy List",
      "manage_pharmacy_network": "Manage your pharmacy network and inventory",
      "pharmacy": "Pharmacy",
      "location": "Location",
      "contact": "Contact",
      "stock_status": "Stock Status",
      "last_sync": "Last Sync",
      "online": "Online",
      "offline": "Offline",
      "optimal": "Optimal",
      "to_monitor": "To Monitor",
      "critical": "Critical",
      "connected_pharmacies": "Connected Pharmacies",
      "currently_online": "Currently online",
      "total_pharmacies": "Total Pharmacies",
      "pharmacies_in_network": "Pharmacies in network",
      
      // Suppliers
      "supplier_management": "Supplier Management",
      "add_supplier": "Add Supplier",
      "supplier_list": "Supplier List",
      "manage_suppliers_orders": "Manage your suppliers and orders",
      "active_suppliers": "Active Suppliers",
      "recent_orders": "Recent Orders",
      "last_30_days": "Last 30 days",
      "purchases_this_month": "Purchases this month",
      "pending_deliveries": "Pending deliveries",
      "deliveries_to_receive": "Deliveries to receive",
      "phone": "Phone",
      "last_order": "Last Order",
      "rating": "Rating",
      "never": "Never",
      
      // Language
      "language": "Language",
      "french": "French",
      "english": "English",
      
      // Notifications
      "notifications": "Notifications",
      "new_prescription_received": "New prescription received",
      "5_minutes_ago": "5 minutes ago",
      "low_stock_paracetamol": "Low stock: Paracetamol",
      "1_hour_ago": "1 hour ago",
      "message_from_jean": "Message from Jean Dupont",
      "3_hours_ago": "3 hours ago",
      
      // Profile
      "my_account": "My Account",
      "profile": "Profile",
      
      // Product categories
      "analgesic": "Analgesic",
      "antibiotic": "Antibiotic",
      "anti_inflammatory": "Anti-inflammatory",
      "hormone": "Hormone",
      "bronchodilator": "Bronchodilator",
      "antispasmodic": "Antispasmodic",
      "dermatology": "Dermatology",
      "para_pharmacy": "Para-pharmacy",
      "other": "Other",
      
      // Order platform
      "order_platform": "Order Platform",
      "available_products": "Available Products",
      "view_products": "View Products",
      "product_catalog": "Product Catalog",
      "add_to_cart": "Add to Cart",
      "cart": "Cart",
      "checkout": "Checkout",
      "quantity": "Quantity",
      "subtotal": "Subtotal",
      "total": "Total",
      "empty_cart": "Your cart is empty",
      "continue_shopping": "Continue Shopping"
    }
  },
  fr: {
    translation: {
      // Navigation
      "dashboard": "Tableau de bord",
      "prescriptions": "Ordonnances",
      "inventory": "Inventaire",
      "products": "Produits",
      "suppliers": "Fournisseurs",
      "pharmacies": "Pharmacies",
      "payments": "Paiements",
      "promotions": "Promotions",
      "analytics": "Analytiques",
      "customers": "Clients",
      "messages": "Messages",
      "settings": "Paramètres",
      "security": "Sécurité",
      "backup": "Sauvegarde",
      "synchronization": "Synchronisation",
      
      // Common actions
      "add": "Ajouter",
      "edit": "Modifier",
      "delete": "Supprimer",
      "save": "Enregistrer",
      "cancel": "Annuler",
      "search": "Rechercher",
      "export": "Exporter",
      "import": "Importer",
      "login": "Connexion",
      "logout": "Déconnexion",
      "register": "S'inscrire",
      "submit": "Soumettre",
      "close": "Fermer",
      "view": "Voir",
      "order": "Commander",
      "place_order": "Passer commande",
      
      // Dashboard
      "welcome": "Bienvenue sur MedLocs",
      "total_products": "Total des produits",
      "products_in_stock": "Produits en stock",
      "low_stock_alerts": "Produits en alerte",
      "products_to_order": "Stock faible à commander",
      "stock_value": "Valeur du stock",
      "total_inventory_value": "Valeur totale de l'inventaire",
      "pending_prescriptions": "23 en attente de traitement",
      "5_low_stock": "5 produits en stock faible",
      "current_month": "Pour le mois en cours",
      "new_this_month": "32 nouveaux ce mois-ci",
      "sales": "Ventes",
      "clients": "Clients",
      
      // Inventory
      "inventory_management": "Gestion de l'inventaire",
      "add_product": "Ajouter un produit",
      "product_list": "Liste des médicaments",
      "manage_inventory": "Gérez votre inventaire de médicaments et autres produits",
      "search_product": "Rechercher un produit...",
      "name": "Nom",
      "category": "Catégorie",
      "stock": "Stock",
      "price": "Prix",
      "actions": "Actions",
      "units": "unités",
      "no_products_found": "Aucun produit trouvé pour les critères spécifiés.",
      
      // Orders
      "orders": "Commandes",
      "order_management": "Gestion des commandes",
      "new_order": "Nouvelle commande",
      "order_history": "Historique des commandes",
      "pending_orders": "Commandes en attente",
      "order_status": "Statut de la commande",
      "supplier": "Fournisseur",
      "order_date": "Date de commande",
      "total_amount": "Montant total",
      "status": "Statut",
      "pending": "En attente",
      "confirmed": "Confirmé",
      "shipped": "Expédié",
      "delivered": "Livré",
      "cancelled": "Annulé",
      
      // Authentication
      "sign_in": "Connexion",
      "sign_up": "Inscription",
      "email": "Email",
      "password": "Mot de passe",
      "confirm_password": "Confirmer le mot de passe",
      "forgot_password": "Mot de passe oublié ?",
      "remember_me": "Se souvenir de moi",
      "dont_have_account": "Vous n'avez pas de compte ?",
      "already_have_account": "Vous avez déjà un compte ?",
      "create_account": "Créer un compte",
      "sign_in_to_account": "Connectez-vous à votre compte",
      "create_new_account": "Créer un nouveau compte",
      
      // Pharmacies
      "pharmacy_management": "Gestion des pharmacies",
      "add_pharmacy": "Ajouter une pharmacie",
      "pharmacy_list": "Liste des pharmacies",
      "manage_pharmacy_network": "Gérez votre réseau de pharmacies et leur inventaire",
      "pharmacy": "Pharmacie",
      "location": "Localisation",
      "contact": "Contact",
      "stock_status": "Statut du stock",
      "last_sync": "Synchronisation",
      "online": "En ligne",
      "offline": "Hors ligne",
      "optimal": "Optimal",
      "to_monitor": "À surveiller",
      "critical": "Critique",
      "connected_pharmacies": "Pharmacies connectées",
      "currently_online": "Actuellement en ligne",
      "total_pharmacies": "Total pharmacies",
      "pharmacies_in_network": "Pharmacies dans le réseau",
      
      // Suppliers
      "supplier_management": "Gestion des fournisseurs",
      "add_supplier": "Ajouter un fournisseur",
      "supplier_list": "Liste des fournisseurs",
      "manage_suppliers_orders": "Gérez vos fournisseurs et commandes",
      "active_suppliers": "Fournisseurs actifs",
      "recent_orders": "Commandes récentes",
      "last_30_days": "30 derniers jours",
      "purchases_this_month": "Achats ce mois",
      "pending_deliveries": "En attente",
      "deliveries_to_receive": "Livraisons à recevoir",
      "phone": "Téléphone",
      "last_order": "Dernière commande",
      "rating": "Note",
      "never": "Jamais",
      
      // Language
      "language": "Langue",
      "french": "Français",
      "english": "Anglais",
      
      // Notifications
      "notifications": "Notifications",
      "new_prescription_received": "Nouvelle ordonnance reçue",
      "5_minutes_ago": "Il y a 5 minutes",
      "low_stock_paracetamol": "Stock faible: Paracétamol",
      "1_hour_ago": "Il y a 1 heure",
      "message_from_jean": "Message de Jean Dupont",
      "3_hours_ago": "Il y a 3 heures",
      
      // Profile
      "my_account": "Mon compte",
      "profile": "Profil",
      
      // Product categories
      "analgesic": "Analgésique",
      "antibiotic": "Antibiotique",
      "anti_inflammatory": "Anti-inflammatoire",
      "hormone": "Hormone",
      "bronchodilator": "Bronchodilatateur",
      "antispasmodic": "Antispasmodique",
      "dermatology": "Dermatologie",
      "para_pharmacy": "Para-pharmacie",
      "other": "Autre",
      
      // Order platform
      "order_platform": "Plateforme de commande",
      "available_products": "Produits disponibles",
      "view_products": "Voir les produits",
      "product_catalog": "Catalogue de produits",
      "add_to_cart": "Ajouter au panier",
      "cart": "Panier",
      "checkout": "Finaliser",
      "quantity": "Quantité",
      "subtotal": "Sous-total",
      "total": "Total",
      "empty_cart": "Votre panier est vide",
      "continue_shopping": "Continuer les achats"
    }
  }
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'fr',
    debug: true,
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
