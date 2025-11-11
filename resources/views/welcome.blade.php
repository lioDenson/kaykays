<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>KayKay - Fresh Daily Products & Bakery</title>
    <meta name="description" content="KayKay offers fresh raw milk, natural mala, kienyeji eggs, and delicious bakery products. Enjoy farm-fresh quality, affordable prices, and fast local delivery every day.">
    
    <!-- Tailwind CSS via CDN -->
    <script src="https://cdn.tailwindcss.com"></script>
    
    <!-- Font Awesome for icons -->
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
    
    <!-- Custom Colors -->
    <script>
        tailwind.config = {
            theme: {
                extend: {
                     colors: {
      // Warm bakery tones
      'primary': '#D97706',       // Golden caramel / baked bread
      'primary-light': '#FBBF24', // Lighter golden / pastry
      'secondary': '#F9A8D4',     // Soft pink / frosting
      'accent': '#EF4444',        // Cherry / jam accent
      // Creamy milk / neutral tones
      'milk': '#FFFBF0',          // Milk cream background
      'milk-light': '#FEF3C7',    // Soft buttery shade
      'medium': '#E5E7EB',        // Gray-neutral for text/background
      'dark': '#374151',          // Dark contrast for text
    },
                    animation: {
                        'float': 'float 6s ease-in-out infinite',
                        'fadeIn': 'fadeIn 1s ease-in-out',
                        'slideIn': 'slideIn 1s ease-in-out',
                    },
                    keyframes: {
                        float: {
                            '0%, 100%': { transform: 'translateY(0px)' },
                            '50%': { transform: 'translateY(-20px)' },
                        },
                        fadeIn: {
                            '0%': { opacity: '0' },
                            '100%': { opacity: '1' },
                        },
                        slideIn: {
                            '0%': { transform: 'translateY(50px)', opacity: '0' },
                            '100%': { transform: 'translateY(0)', opacity: '1' },
                        }
                    }
                }
            }
        }
    </script>
    
    <style>
        .glass {
            background: rgba(255, 255, 255, 0.8);
            backdrop-filter: blur(20px);
            border: 1px solid rgba(255, 255, 255, 0.3);
        }
        
        .scrollbar-hide {
            -ms-overflow-style: none;
            scrollbar-width: none;
        }
        
        .scrollbar-hide::-webkit-scrollbar {
            display: none;
        }
        
        .parallax {
            background-attachment: fixed;
            background-position: center;
            background-repeat: no-repeat;
            background-size: cover;
        }
        
        .hero-section {
            background-image: linear-gradient(rgba(219, 219, 204, 0.3), rgba(209, 183, 98, 0.5)),
            url('https://images.unsplash.com/photo-1587139088085-0b3d4e3bc294?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1470');
             /* url('https://images.unsplash.com/photo-1509440159596-0249088772ff?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2072&q=80'); */
            height: 100vh;
            background-position: center;
            background-repeat: no-repeat;
            background-size: cover;
            position: relative;
        }
        
        .product-card:hover {
            transform: translateY(-10px);
            transition: transform 0.3s ease;
        }
        
        .testimonial-card {
            transition: all 0.3s ease;
        }
        
        .testimonial-card:hover {
            transform: scale(1.05);
        }
    </style>
</head>
<body class="min-h-screen bg-light">
    <!-- Header/Navigation -->
    <header class="fixed w-full z-50 bg-white/90 backdrop-blur-sm shadow-sm">
        <div class="container mx-auto px-4 py-4">
            <div class="flex items-center justify-between">
                <!-- Logo -->
                <div class="flex items-center gap-3">
                    <div class="h-10 w-10 rounded-xl bg-gradient-to-br from-secondary to-primary flex items-center justify-center">
                        <i class="fas fa-bread-slice text-white"></i>
                    </div>
                    <span class="text-2xl font-bold bg-gradient-to-br from-dark to-primary bg-clip-text text-transparent">
                        KayKay's
                    </span>
                </div>

                <!-- Desktop Navigation -->
                <nav class="hidden md:flex items-center gap-8">
                    <a href="#home" class="text-dark hover:text-primary font-medium transition-colors">Home</a>
                    <a href="#products" class="text-dark hover:text-primary font-medium transition-colors">Products</a>
                    <a href="#bakery" class="text-dark hover:text-primary font-medium transition-colors">Bakery</a>
                    <a href="#about" class="text-dark hover:text-primary font-medium transition-colors">About</a>
                    <a href="#testimonials" class="text-dark hover:text-primary font-medium transition-colors">Testimonials</a>
                </nav>

                <!-- Navigation Actions -->
                <div class="flex items-center gap-4">
                    <a href="/cart" class="relative p-2 rounded-lg glass hover:shadow-lg transition-all duration-200 hover:scale-105">
                        <i class="fas fa-shopping-cart text-dark"></i>
                        <span class="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-gradient-to-r from-secondary to-primary text-xs text-white flex items-center justify-center">
                            3
                        </span>
                    </a>
                    <a href="/login" class="flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-secondary to-primary text-white shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-105">
                        <i class="fas fa-sign-in-alt"></i>
                        <span class="font-medium">Login</span>
                    </a>
                    
                    <!-- Mobile Menu Button -->
                    <button id="mobile-menu-button" class="md:hidden p-2 rounded-lg glass hover:shadow-lg transition-all duration-200">
                        <i class="fas fa-bars text-dark"></i>
                    </button>
                </div>
            </div>
            
            <!-- Mobile Navigation -->
            <div id="mobile-menu" class="hidden md:hidden mt-4 py-4 border-t border-medium">
                <div class="flex flex-col gap-4">
                    <a href="#home" class="text-dark hover:text-primary font-medium transition-colors">Home</a>
                    <a href="#products" class="text-dark hover:text-primary font-medium transition-colors">Products</a>
                    <a href="#bakery" class="text-dark hover:text-primary font-medium transition-colors">Bakery</a>
                    <a href="#about" class="text-dark hover:text-primary font-medium transition-colors">About</a>
                    <a href="#testimonials" class="text-dark hover:text-primary font-medium transition-colors">Testimonials</a>
                </div>
            </div>
        </div>
    </header>

    <!-- Hero Section -->
    <section id="home" class="hero-section flex items-center text-white">
        <div class="container  px-4">
            <div class="max-w-4xl  text-satrt space-y-6 animate-fadeIn gap-y-2.5">
                <h1 class="text-4xl md:text-6xl  font-bold leading-loose">
                    Fresh Daily Products 
                    <span class="block ml-10 text-7xl text-black" style="text-shadow: 2px 2px 4px rgba(0,0,0,0.5);">&</span>

                    <span class="block text-shadow-2xl  text-shadow-black bg-gradient-to-r from-amber-400 to-amber-800 bg-clip-text text-transparent ">
                        Artisan Bakery
                    </span>
                </h1>
                <p class="text-xl md:text-2xl  max-w-2xl mx-auto leading-loose">
                    Farm-fresh milk, natural mala, kienyeji eggs, and delicious baked goods delivered daily to your doorstep.
                </p>
                <div class="flex flex-col sm:flex-row gap-4 justify-center mt-8">
                    <a href="#products" class="px-8 py-4 rounded-xl bg-gradient-to-r from-secondary to-primary text-white font-semibold shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-105">
                        <i class="fas fa-shopping-basket mr-2"></i>
                        Shop Now
                    </a>
                    <a href="#about" class="px-8 py-4 rounded-xl border border-white text-white font-semibold hover:bg-white/10 transition-all duration-200">
                        Learn More
                    </a>
                </div>
            </div>
        </div>
        
        <!-- Scroll Indicator -->
        <div class="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
            <a href="#products" class="text-white text-2xl">
                <i class="fas fa-chevron-down"></i>
            </a>
        </div>
    </section>

    <!-- Featured Products Section -->
    <section id="products" class="py-16 bg-white">
        <div class="container mx-auto px-4">
            <div class="text-center mb-12 animate-slideIn">
                <h2 class="text-3xl md:text-4xl font-bold text-dark mb-4">Our Fresh Products</h2>
                <p class="text-lg text-dark/70 max-w-2xl mx-auto">Daily delivered farm-fresh products for your healthy lifestyle</p>
            </div>

            <div class="flex flex-1 p-2 overflow-x-scroll scrollbar-hide gap-8">
                <!-- Product 1 -->
                <div class="product-card bg-light rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300">
                    <div class="flex justify-between items-start mb-4">
                        <span class="px-3 py-1 rounded-full text-xs font-medium bg-gradient-to-r from-accent to-primary text-white">
                            Fresh Today
                        </span>
                        <button class="p-2 rounded-full bg-medium hover:bg-red-50 transition-colors">
                            <i class="fas fa-heart text-dark hover:text-red-500"></i>
                        </button>
                    </div>
                    <div class="w-full h-48 rounded-xl mb-4 overflow-hidden">
                        <img src="https://images.unsplash.com/photo-1563636619-e9143da7973b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80" alt="Fresh Milk" class="w-full h-full object-cover">
                    </div>
                    <div class="space-y-3">
                        <h3 class="font-semibold text-dark text-lg">Fresh Raw Milk</h3>
                        <p class="text-dark/70 text-sm">Direct from our farm, unpasteurized and full of nutrients</p>
                        <div class="flex items-center gap-2">
                            <div class="flex items-center gap-1">
                                <i class="fas fa-star text-yellow-400"></i>
                                <i class="fas fa-star text-yellow-400"></i>
                                <i class="fas fa-star text-yellow-400"></i>
                                <i class="fas fa-star text-yellow-400"></i>
                                <i class="fas fa-star-half-alt text-yellow-400"></i>
                            </div>
                            <span class="text-sm text-dark/70">(247)</span>
                        </div>
                        <div class="flex items-center justify-between">
                            <div class="text-2xl font-bold text-dark">
                                Ksh 120
                            </div>
                            <button class="px-4 py-2 rounded-lg bg-gradient-to-r from-secondary to-primary text-white font-medium hover:shadow-lg transition-all duration-200">
                                Add to Cart
                            </button>
                        </div>
                    </div>
                </div>

                <!-- Product 2 -->
                <div class="product-card bg-light rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300">
                    <div class="flex justify-between items-start mb-4">
                        <span class="px-3 py-1 rounded-full text-xs font-medium bg-gradient-to-r from-accent to-primary text-white">
                            Popular
                        </span>
                        <button class="p-2 rounded-full bg-medium hover:bg-red-50 transition-colors">
                            <i class="fas fa-heart text-dark hover:text-red-500"></i>
                        </button>
                    </div>
                    <div class="w-full h-48 rounded-xl mb-4 overflow-hidden">
                        <img src="https://images.unsplash.com/photo-1586201375761-83865001e31c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80" alt="Kienyeji Eggs" class="w-full h-full object-cover">
                    </div>
                    <div class="space-y-3">
                        <h3 class="font-semibold text-dark text-lg">Kienyeji Eggs</h3>
                        <p class="text-dark/70 text-sm">Free-range chicken eggs, rich in flavor and nutrients</p>
                        <div class="flex items-center gap-2">
                            <div class="flex items-center gap-1">
                                <i class="fas fa-star text-yellow-400"></i>
                                <i class="fas fa-star text-yellow-400"></i>
                                <i class="fas fa-star text-yellow-400"></i>
                                <i class="fas fa-star text-yellow-400"></i>
                                <i class="fas fa-star text-yellow-400"></i>
                            </div>
                            <span class="text-sm text-dark/70">(189)</span>
                        </div>
                        <div class="flex items-center justify-between">
                            <div class="text-2xl font-bold text-dark">
                                Ksh 450
                            </div>
                            <button class="px-4 py-2 rounded-lg bg-gradient-to-r from-secondary to-primary text-white font-medium hover:shadow-lg transition-all duration-200">
                                Add to Cart
                            </button>
                        </div>
                    </div>
                </div>

                <!-- Product 3 -->
                <div class="product-card bg-light rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300">
                    <div class="flex justify-between items-start mb-4">
                        <span class="px-3 py-1 rounded-full text-xs font-medium bg-gradient-to-r from-accent to-primary text-white">
                            New
                        </span>
                        <button class="p-2 rounded-full bg-medium hover:bg-red-50 transition-colors">
                            <i class="fas fa-heart text-dark hover:text-red-500"></i>
                        </button>
                    </div>
                    <div class="w-full h-48 rounded-xl mb-4 overflow-hidden">
                        <img src="https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80" alt="Natural Mala" class="w-full h-full object-cover">
                    </div>
                    <div class="space-y-3">
                        <h3 class="font-semibold text-dark text-lg">Natural Mala</h3>
                        <p class="text-dark/70 text-sm">Traditional fermented milk, probiotic-rich and refreshing</p>
                        <div class="flex items-center gap-2">
                            <div class="flex items-center gap-1">
                                <i class="fas fa-star text-yellow-400"></i>
                                <i class="fas fa-star text-yellow-400"></i>
                                <i class="fas fa-star text-yellow-400"></i>
                                <i class="fas fa-star text-yellow-400"></i>
                                <i class="far fa-star text-yellow-400"></i>
                            </div>
                            <span class="text-sm text-dark/70">(156)</span>
                        </div>
                        <div class="flex items-center justify-between">
                            <div class="text-2xl font-bold text-dark">
                                Ksh 180
                            </div>
                            <button class="px-4 py-2 rounded-lg bg-gradient-to-r from-secondary to-primary text-white font-medium hover:shadow-lg transition-all duration-200">
                                Add to Cart
                            </button>
                        </div>
                    </div>
                </div>

                <!-- Product 4 -->
                <div class="product-card bg-light rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300">
                    <div class="flex justify-between items-start mb-4">
                        <span class="px-3 py-1 rounded-full text-xs font-medium bg-gradient-to-r from-accent to-primary text-white">
                            Bestseller
                        </span>
                        <button class="p-2 rounded-full bg-medium hover:bg-red-50 transition-colors">
                            <i class="fas fa-heart text-dark hover:text-red-500"></i>
                        </button>
                    </div>
                    <div class="w-full h-48 rounded-xl mb-4 overflow-hidden">
                        <img src="https://images.unsplash.com/photo-1549931319-a545dcf3bc73?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80" alt="Fresh Butter" class="w-full h-full object-cover">
                    </div>
                    <div class="space-y-3">
                        <h3 class="font-semibold text-dark text-lg">Farm Fresh Butter</h3>
                        <p class="text-dark/70 text-sm">Creamy, rich butter made from our farm's fresh milk</p>
                        <div class="flex items-center gap-2">
                            <div class="flex items-center gap-1">
                                <i class="fas fa-star text-yellow-400"></i>
                                <i class="fas fa-star text-yellow-400"></i>
                                <i class="fas fa-star text-yellow-400"></i>
                                <i class="fas fa-star text-yellow-400"></i>
                                <i class="fas fa-star-half-alt text-yellow-400"></i>
                            </div>
                            <span class="text-sm text-dark/70">(203)</span>
                        </div>
                        <div class="flex items-center justify-between">
                            <div class="text-2xl font-bold text-dark">
                                Ksh 320
                            </div>
                            <button class="px-4 py-2 rounded-lg bg-gradient-to-r from-secondary to-primary text-white font-medium hover:shadow-lg transition-all duration-200">
                                Add to Cart
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <!-- Bakery Section -->
    <section id="bakery" class="py-16 bg-gradient-to-br from-light to-medium">
        <div class="container mx-auto px-4">
            <div class="text-center mb-12">
                <h2 class="text-3xl md:text-4xl font-bold text-dark mb-4">Artisan Bakery</h2>
                <p class="text-lg text-dark/70 max-w-2xl mx-auto">Freshly baked goods made with love and the finest ingredients</p>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                <!-- Bakery Item 1 -->
                <div class="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 product-card">
                    <div class="w-full h-48 rounded-xl mb-4 overflow-hidden">
                        <img src="https://images.unsplash.com/photo-1509440159596-0249088772ff?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80" alt="Fresh Bread" class="w-full h-full object-cover">
                    </div>
                    <div class="space-y-3">
                        <h3 class="font-semibold text-dark text-lg">Artisan Bread</h3>
                        <p class="text-dark/70 text-sm">Freshly baked daily with organic flour and natural yeast</p>
                        <div class="flex items-center justify-between">
                            <div class="text-2xl font-bold text-dark">
                                Ksh 250
                            </div>
                            <button class="px-4 py-2 rounded-lg bg-gradient-to-r from-secondary to-primary text-white font-medium hover:shadow-lg transition-all duration-200">
                                Add to Cart
                            </button>
                        </div>
                    </div>
                </div>

                <!-- Bakery Item 2 -->
                <div class="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 product-card">
                    <div class="w-full h-48 rounded-xl mb-4 overflow-hidden">
                        <img src="https://images.unsplash.com/photo-1558961363-fa8fdf82db35?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80" alt="Croissants" class="w-full h-full object-cover">
                    </div>
                    <div class="space-y-3">
                        <h3 class="font-semibold text-dark text-lg">Buttery Croissants</h3>
                        <p class="text-dark/70 text-sm">Flaky, buttery croissants perfect for breakfast</p>
                        <div class="flex items-center justify-between">
                            <div class="text-2xl font-bold text-dark">
                                Ksh 180
                            </div>
                            <button class="px-4 py-2 rounded-lg bg-gradient-to-r from-secondary to-primary text-white font-medium hover:shadow-lg transition-all duration-200">
                                Add to Cart
                            </button>
                        </div>
                    </div>
                </div>

                <!-- Bakery Item 3 -->
                <div class="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 product-card">
                    <div class="w-full h-48 rounded-xl mb-4 overflow-hidden">
                        <img src='https://images.unsplash.com/photo-1523294587484-bae6cc870010?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1002'/>
                    </div>
                    <div class="space-y-3">
                        <h3 class="font-semibold text-dark text-lg">Custom Cakes</h3>
                        <p class="text-dark/70 text-sm">Beautiful, delicious cakes for all occasions</p>
                        <div class="flex items-center justify-between">
                            <div class="text-2xl font-bold text-dark">
                                From Ksh 1,500
                            </div>
                            <button class="px-4 py-2 rounded-lg bg-gradient-to-r from-secondary to-primary text-white font-medium hover:shadow-lg transition-all duration-200">
                                Order Now
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <!-- Testimonials Section -->
    <section id="testimonials" class="py-16 bg-white">
        <div class="container mx-auto px-4">
            <div class="text-center mb-12">
                <h2 class="text-3xl md:text-4xl font-bold text-dark mb-4">What Our Customers Say</h2>
                <p class="text-lg text-dark/70 max-w-2xl mx-auto">Don't just take our word for it - hear from our happy customers</p>
            </div>

            <div class="flex flex-1 overflow-x-scroll scrollbar-hide scroll-smooth p-2 md:grid-cols-2 lg:grid-cols-3 gap-8">
                <!-- Testimonial 1 -->
                <div class="testimonial-card bg-light rounded-2xl p-6 shadow-lg">
                    <div class="flex items-center gap-4 mb-4">
                        <div class="h-12 w-12 rounded-full bg-gradient-to-r from-secondary to-primary flex items-center justify-center text-white font-bold">
                            M
                        </div>
                        <div>
                            <h4 class="font-semibold text-dark">Mary W.</h4>
                            <div class="flex items-center gap-1">
                                <i class="fas fa-star text-yellow-400"></i>
                                <i class="fas fa-star text-yellow-400"></i>
                                <i class="fas fa-star text-yellow-400"></i>
                                <i class="fas fa-star text-yellow-400"></i>
                                <i class="fas fa-star text-yellow-400"></i>
                            </div>
                        </div>
                    </div>
                    <p class="text-dark/70">"The fresh milk from KayKay is the best I've ever tasted! My family loves it and we've been loyal customers for over a year now."</p>
                </div>

                <!-- Testimonial 2 -->
                <div class="testimonial-card bg-light rounded-2xl p-6 shadow-lg">
                    <div class="flex items-center gap-4 mb-4">
                        <div class="h-12 w-12 rounded-full bg-gradient-to-r from-secondary to-primary flex items-center justify-center text-white font-bold">
                            J
                        </div>
                        <div>
                            <h4 class="font-semibold text-dark">John K.</h4>
                            <div class="flex items-center gap-1">
                                <i class="fas fa-star text-yellow-400"></i>
                                <i class="fas fa-star text-yellow-400"></i>
                                <i class="fas fa-star text-yellow-400"></i>
                                <i class="fas fa-star text-yellow-400"></i>
                                <i class="fas fa-star-half-alt text-yellow-400"></i>
                            </div>
                        </div>
                    </div>
                    <p class="text-dark/70">"Their kienyeji eggs are amazing! The yolks are so rich and orange, unlike anything from the supermarket. Highly recommended!"</p>
                </div>

                <!-- Testimonial 3 -->
                <div class="testimonial-card bg-light rounded-2xl p-6 shadow-lg">
                    <div class="flex items-center gap-4 mb-4">
                        <div class="h-12 w-12 rounded-full bg-gradient-to-r from-secondary to-primary flex items-center justify-center text-white font-bold">
                            S
                        </div>
                        <div>
                            <h4 class="font-semibold text-dark">Sarah M.</h4>
                            <div class="flex items-center gap-1">
                                <i class="fas fa-star text-yellow-400"></i>
                                <i class="fas fa-star text-yellow-400"></i>
                                <i class="fas fa-star text-yellow-400"></i>
                                <i class="fas fa-star text-yellow-400"></i>
                                <i class="fas fa-star text-yellow-400"></i>
                            </div>
                        </div>
                    </div>
                    <p class="text-dark/70">"I ordered a custom cake for my daughter's birthday and it was absolutely beautiful and delicious! Will definitely order again."</p>
                </div>
            </div>
        </div>
    </section>

    <!-- CTA Section -->
    <section class="py-16 bg-gradient-to-r from-secondary to-primary text-white">
        <div class="container mx-auto px-4 text-center">
            <div class="max-w-2xl mx-auto">
                <h2 class="text-3xl md:text-4xl font-bold mb-6">Ready to Taste the Difference?</h2>
                <p class="text-lg mb-8">Join our community of happy customers enjoying fresh, quality products every day.</p>
                <div class="flex flex-col sm:flex-row gap-4 justify-center">
                    <a href="/login" class="px-8 py-4 rounded-xl bg-white text-primary font-semibold shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-105">
                        <i class="fas fa-user-plus mr-2"></i>
                        Create Account
                    </a>
                    <a href="/products" class="px-8 py-4 rounded-xl border border-white text-white font-semibold hover:bg-white/10 transition-all duration-200">
                        Browse All Products
                    </a>
                </div>
            </div>
        </div>
    </section>

    <!-- Footer -->
    <footer class="bg-dark text-white py-12">
        <div class="container mx-auto px-4">
            <div class="grid grid-cols-1 md:grid-cols-4 gap-8">
                <div>
                    <div class="flex items-center gap-3 mb-4">
                        <div class="h-10 w-10 rounded-xl bg-gradient-to-br from-secondary to-primary flex items-center justify-center">
                            <i class="fas fa-bread-slice text-white"></i>
                        </div>
                        <span class="text-xl font-bold">KayKay's</span>
                    </div>
                    <p class="text-light/70">Fresh daily products and artisan bakery for your healthy lifestyle.</p>
                </div>
                
                <div>
                    <h3 class="font-semibold text-lg mb-4">Quick Links</h3>
                    <ul class="space-y-2">
                        <li><a href="#home" class="text-light/70 hover:text-white transition-colors">Home</a></li>
                        <li><a href="#products" class="text-light/70 hover:text-white transition-colors">Products</a></li>
                        <li><a href="#bakery" class="text-light/70 hover:text-white transition-colors">Bakery</a></li>
                        <li><a href="#about" class="text-light/70 hover:text-white transition-colors">About Us</a></li>
                    </ul>
                </div>
                
                <div>
                    <h3 class="font-semibold text-lg mb-4">Contact Us</h3>
                    <ul class="space-y-2 text-light/70">
                        <li class="flex items-center gap-2">
                            <i class="fas fa-map-marker-alt"></i>
                            <span>Nairobi, Kenya</span>
                        </li>
                        <li class="flex items-center gap-2">
                            <i class="fas fa-phone"></i>
                            <span>+254 712 345 678</span>
                        </li>
                        <li class="flex items-center gap-2">
                            <i class="fas fa-envelope"></i>
                            <span>info@kaykays.com</span>
                        </li>
                    </ul>
                </div>
                
                <div>
                    <h3 class="font-semibold text-lg mb-4">Follow Us</h3>
                    <div class="flex gap-4">
                        <a href="#" class="h-10 w-10 rounded-full bg-light/10 flex items-center justify-center hover:bg-primary transition-colors">
                            <i class="fab fa-facebook-f"></i>
                        </a>
                        <a href="#" class="h-10 w-10 rounded-full bg-light/10 flex items-center justify-center hover:bg-primary transition-colors">
                            <i class="fab fa-instagram"></i>
                        </a>
                        <a href="#" class="h-10 w-10 rounded-full bg-light/10 flex items-center justify-center hover:bg-primary transition-colors">
                            <i class="fab fa-twitter"></i>
                        </a>
                    </div>
                </div>
            </div>
            
            <div class="border-t border-light/20 mt-8 pt-8 text-center text-light/70">
                <p>&copy; 2023 KayKay's. All rights reserved. Fresh daily products & bakery delights.</p>
            </div>
        </div>
    </footer>

    <script>
        // Mobile menu toggle
        document.getElementById('mobile-menu-button').addEventListener('click', function() {
            const menu = document.getElementById('mobile-menu');
            menu.classList.toggle('hidden');
        });

        // Smooth scrolling for anchor links
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                
                const targetId = this.getAttribute('href');
                if(targetId === '#') return;
                
                const targetElement = document.querySelector(targetId);
                if(targetElement) {
                    window.scrollTo({
                        top: targetElement.offsetTop - 80,
                        behavior: 'smooth'
                    });
                    
                    // Close mobile menu if open
                    const mobileMenu = document.getElementById('mobile-menu');
                    mobileMenu.classList.add('hidden');
                }
            });
        });

        // Add animation on scroll
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate-slideIn');
                }
            });
        }, observerOptions);

        // Observe elements for animation
        document.querySelectorAll('.product-card, .testimonial-card').forEach(el => {
            observer.observe(el);
        });
    </script>
</body>
</html>