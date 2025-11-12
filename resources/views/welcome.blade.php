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
                        'slideIn': 'slideIn 1.5s ease-in-out',
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
            background: rgba(255, 255, 255, 0.6);
            backdrop-filter: blur(10px);
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
            transform: translateY(-2px);
            transition: transform 0.3s ease;
        }

        .product-card img {
            transition: transform 0.8s ease-in-out;
        }

        .product-card img:hover {
            transform: scale(1.6);
        }

       .testimonial-container {
            display: flex;
            gap: 1rem;
        }



.testimonial-card {
    transition: transform 0.6s ease, opacity 0.6s ease;
}

.testimonial-container:has(.testimonial-card:hover, .active) .testimonial-card {
    transform: scale(1.1);
    opacity: 1;
    z-index: 10;
}

.testimonial-card:hover ~ .testimonial-card,
.testimonial-container:has(.testimonial-card:hover, .active) .testimonial-card:not(:hover, .active){
    transform: scale(0.9);
    opacity: 0.6;
    filter: blur(1.5px);
}

}
}

    </style>
</head>
<body class="min-h-screen bg-light">
    <!-- Header/Navigation -->
    <header class="fixed w-full z-50 bg-white/90 backdrop-blur-sm shadow-sm">
    <div class="container mx-auto px-4 py-2">
        <!-- Mobile Layout -->
        <div class="block md:hidden space-y-2">
            <!-- First Row: Logo, Name, Menu Button -->
            <div class="flex items-center justify-between">
                <!-- Logo and Name -->
                <a href='/' >
                    <div class="flex items-center gap-2">
                    <div class="h-8 w-8 rounded-lg bg-gradient-to-br from-secondary to-primary flex items-center justify-center">
                        <i class="fas fa-bread-slice text-white text-sm"></i>
                    </div>
                    <span class="text-xl font-bold bg-gradient-to-br from-dark to-primary bg-clip-text text-transparent">
                        KayKay's
                    </span>
                </div>
            </a>

                <!-- Mobile Menu Button -->
                <button id="mobile-menu-button" class="p-2 rounded-lg glass hover:shadow-lg transition-all duration-200">
                    <i class="fas fa-bars text-dark text-sm"></i>
                </button>
            </div>

            <!-- Second Row: Login and Cart - Compact -->
            <div class="flex items-center justify-end gap-2">
                <!-- Login Button -->
                

                <!-- Cart Icon -->
                <a href="/cart" class="relative p-2 max-w-fit rounded-lg glass hover:shadow-lg transition-all duration-200 group flex-1 text-center">
                    <i class="fas fa-shopping-cart text-dark text-sm"></i>
                    <span class="absolute -top-1 -right-1 h-4 w-4 rounded-full bg-gradient-to-r from-red-400 to-red-700 text-xs text-white flex items-center justify-center text-[10px]">
                        3
                    </span>
                </a>
                <a href="/login" class="flex max-w-fit items-center gap-1 px-3 py-1.5 rounded-lg bg-gradient-to-r from-secondary to-primary text-white text-sm hover:shadow-lg transition-all duration-200 hover:scale-105 flex-1 justify-center">
                    <i class="fas fa-sign-in-alt text-xs"></i>
                    <span class="font-medium">Login</span>
                </a>
            </div>
        </div>

        <!-- Desktop Layout (same as above) -->
        <div class="hidden md:flex items-center justify-between w-full">
            <!-- Desktop content remains the same -->
            <a href='/'>
                            <div class="flex items-center gap-3">
                <div class="h-10 w-10 rounded-xl bg-gradient-to-br from-secondary to-primary flex items-center justify-center">
                    <i class="fas fa-bread-slice text-white"></i>
                </div>
                <span class="text-2xl font-bold bg-gradient-to-br from-dark to-primary bg-clip-text text-transparent">
                    KayKay's
                </span>
            </div>
        </a>
             @php 
            $menuItems = [
                ['name' => 'Home', 'url'=> '#home'],
                ['name' => 'Products', 'url'=> '#products'],
                ['name' => 'Bakery', 'url'=> '#bakery'],
                ['name' => 'Testimonials', 'url'=> '#testimonials'],
                ['name' => 'Join Us', 'url'=> '#join'],
                ['name' => 'Contact', 'url'=> '#contact']
                
            ];
        @endphp

            <nav class="flex items-center gap-6 lg:gap-8">
                

                    @foreach($menuItems as $menuItem)
                    @php 
                $url = $menuItem['url'];
                @endphp
                        <a href={{ "{$url}" }} class="text-dark hover:text-primary font-medium transition-colors py-2 px-1">{{ $menuItem['name'] }}</a>

                    @endforeach
            </nav>

            <div class="flex items-center gap-4">
                <a href="/cart" class="relative p-2 rounded-lg glass hover:shadow-lg transition-all duration-200 group">
                    <i class="fas fa-shopping-cart text-dark group-hover:scale-105 transition-transform"></i>
                    <span class="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-gradient-to-r from-red-400 to-red-700 text-xs text-white flex items-center justify-center">
                        3
                    </span>
                </a>
                <a href="/login" class="flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-secondary to-primary text-white shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-105">
                    <i class="fas fa-sign-in-alt"></i>
                    <span class="font-medium">Login</span>
                </a>
            </div>
        </div>
        
        
        <!-- Mobile Navigation Menu -->

       
        <div id="mobile-menu" class="hidden md:hidden mt-3 py-3 border-t border-medium">
            <div class="flex flex-wrap justify-between w-full overflow-hidden  scrollbar-hide gap-3  ">
                @foreach($menuItems as $menuItem)
                @php $url = $menuItem['url']; @endphp
                <a href={{"{$url}"}} class="text-dark hover:text-primary font-medium transition-colors py-2 px-2 rounded-lg hover:bg-gray-50 text-sm ">{{ $menuItem['name'] }}</a>
                @endforeach
            </div>
        </div>
    </div>
</header>

    <!-- Hero Section -->
    <section id="home" class="hero-section flex items-center text-white">
        <div class="container text-start  px-4">
            <div class="lg:max-w-4xl max-w-full space-y-4 md:space-y-6 animate-fadeIn gap-y-2.5">
                <div class="flex flex-col w-fit  md:items-center justify-center space-y-2">
                    <h1 class="text-3xl md:text-6xl w-full  font-bold leading-tight text-center">
                        Fresh Daily Products 
                    </h1>
                    <span class="block ml-10 text-2xl md:text-7xl text-center text-amber-500/60" style="text-shadow: 2px 2px 4px rgba(0,0,0,0.5);">&</span>
                    <h1 class="block text-3xl md:text-6xl lg:text-7xl text-center w-full font-bold text-shadow-2xl  text-shadow-black bg-gradient-to-r from-yellow-400/95 to-yellow-800 bg-clip-text text-transparent" style="text-shadow: 3px 3px 3px rgba(245, 165, 16, 0.836);">
                        Artisan Bakery
                    </h1>
                </div>
                
                
            </div>
            <div class="max-w-5xl  space-6 w-fit absolute bottom-1 text-start mt-8 animate-fadeIn  md:bg-transparent" style="text-shadow: 6px 2.5px 5px rgba(236, 167, 17, 0.6);">
 <p class="text-xl md:text-2xl font-extralight text-satrt mt-4 max-w-2xl mx-auto text-center text-gray-200  animate-slideIn">
                    Farm-fresh milk, natural mala, kienyeji eggs, and delicious baked goods delivered daily to your doorstep.
                    Make an order and enjoy you pack of premium joy
                </p>
               
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
            @php
                $dailyProducts = [
            [
                "name"=> 'Fresh Raw Milk',
                "imageUrl"=> "https://images.unsplash.com/photo-1550583724-b2692b85b150?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MzN8fG1pbGslMjBpbiUyMHRhbmt8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&q=60&w=500",
                "fallBack"=> 'image',
                "tag"=> 'Full Cream ',
                "description"=> 'Direct from our farm, unpasteurized and full of nutrients',
                "stars"=> 4.5,
                "starCount"=> 247,
                "price"=> 90
        ],
            [
                "name"=> 'Kienyeji Eggs',
                "imageUrl"=> "https://images.unsplash.com/photo-1590991977680-d00d9e4f4ae9?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=472",
                "fallBack"=> 'image',
                "tag"=> 'Rich in Flavor ',
                "description"=> 'Free-range chicken eggs, rich in flavor and nutrients',
                "stars"=> 5,
                "starCount"=> 189,
                "price"=> 600
        ],
            [
                "name"=> 'Natural Mala',
                "imageUrl"=> "https://images.unsplash.com/photo-1540915506836-cd886d09205d?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTk4fHxmZXJtZW50ZWQlMjBtaWxrfGVufDB8fDB8fHww&auto=format&fit=crop&q=60&w=500",
                "fallBack"=> 'image',
                "tag"=> 'Natural',
                "description"=> 'Traditional fermented milk, probiotic-rich and refreshing',
                "stars"=> 4,
                "starCount"=> 156,
                "price"=> 160
        ],
            [
                "name"=> 'Farm Fresh Cheese',
                "imageUrl"=> "https://images.unsplash.com/photo-1683314573422-649a3c6ad784?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1470",
                "fallBack"=> 'image',
                "tag"=> ' Comming Soon ',
                "description"=> "Spongy, cheese made from our farm's fresh milk",
                "stars"=> 4.5,
                "starCount"=> 203,
                "price"=> 250
        ],
        ];
            @endphp
            <div class="flex  overflow-x-scroll scrollbar-hide gap-8" id="daily">
                @foreach($dailyProducts as $product)
                    <div class="product-card bg-light min-w-[300px] rounded-2xl p-4 shadow-lg hover:shadow-xl transition-all duration-300" >
                    <div class="flex justify-between items-start mb-4">
                        <span class="px-3 py-1 rounded-full text-xs font-medium bg-gradient-to-r from-accent to-primary text-white">
                           {{$product['tag']}}
                        </span>
                        <button class="py-1 px-2 rounded-full bg-medium hover:bg-red-50 transition-colors">
                            <i class="fas fa-heart text-dark hover:text-red-500"></i>
                        </button>
                    </div>
                    <div class="w-full h-48 rounded-xl mb-4 overflow-hidden">
                        <img 
                        src="{{ $product['imageUrl'] }} "
                        alt="{{ $product['name'] }}" 
                         class="w-full h-full object-cover"/>
                    </div>
                    <div class="space-y-3">
                        <h3 class="font-semibold text-dark text-lg">{{ $product['name'] }}</h3>
                        <p class="text-dark/70 text-sm">{{ $product['description'] }}</p>
                        <div class="flex items-center gap-2">
                            <div class="flex items-center gap-1">
                                @for($i = 0; $i < floor($product['stars']); $i++)
                                <i class="fas fa-star text-yellow-400"></i>
                                @endfor
                                @if(is_float($product['stars']) )
                                <i class="fas fa-star-half-alt text-yellow-400"></i>
                                @endif
                            </div>
                            <span class="text-sm text-dark/70">({{ $product['starCount'] }})</span>
                        </div>
                        <div class="flex items-center justify-between">
                            <div class="text-2xl font-bold text-dark">
                                Ksh {{ $product['price'] }}
                            </div>
                            <button class="px-4 py-2 rounded-lg bg-gradient-to-r from-secondary to-primary text-white font-medium hover:shadow-lg transition-all duration-200">
                                Add to Cart
                            </button>
                        </div>
                    </div>
                </div>
                @endforeach
                <!-- Product 1 -->
                
            </div>
        </div>
    </section>

    @php
        $bakeryProduct = [
            [
                'name' => 'Artisan Bread',
                'imageUrl' => 'https://images.unsplash.com/photo-1509440159596-0249088772ff?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
                'description' => 'Freshly baked daily with organic flour and natural yeast',
                'price' => 250,
            ],
            [
                'name' => 'Buttery Croissants',
                'imageUrl' => 'https://images.unsplash.com/photo-1558961363-fa8fdf82db35?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
                'description' => 'Flaky, buttery croissants perfect for breakfast',
                'price' =>180 ,
],
[
                'name' => 'Flaky, buttery croissants perfect for breakfast',
                'imageUrl' => 'https://images.unsplash.com/photo-1523294587484-bae6cc870010?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1002',
                'description' => 'Beautiful, delicious cakes for all occasions',
                'price' => 1500,
],
[
                'name' => 'Cake-Milk Combo',
                'imageUrl' => 'https://images.unsplash.com/photo-1587139088085-0b3d4e3bc294?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1470',
                'description' => 'Sweet Milk & cake combination pack',
                'price' => 100,
            ]
        ]
    @endphp

    <!-- Bakery Section -->
    <section id="bakery" class="py-16 bg-gradient-to-br from-light to-medium">
        <div class="container mx-auto px-4">
            <div class="text-center mb-12">
                <h2 class="text-3xl md:text-4xl font-bold text-dark mb-4">Artisan Bakery</h2>
                <p class="text-lg text-dark/70 max-w-2xl mx-auto">Freshly baked goods made with love and the finest ingredients</p>
            </div>

            <div class=" flex overflow-x-scroll scroll-smooth scrollbar-hide md:grid md:grid-cols-2 lg:grid-cols-3 gap-8" id="bakery-items">
                <!-- Bakery Items -->
                @foreach ($bakeryProduct as $product)
                    <div class="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl min-w-[300px] transition-all duration-300 product-card">
                    <div class="w-full h-48 rounded-xl mb-4 overflow-hidden">
                        <img 
                        src={{ $product['imageUrl'] }}
                        alt={{ $product['name'] }} class="w-full h-full object-cover">
                    </div>
                    <div class="space-y-3">
                        <h3 class="font-semibold text-dark text-lg">{{ $product['name'] }}</h3>
                        <p class="text-dark/70 text-sm">{{ $product['description'] }}</p>
                        <div class="flex items-center justify-between">
                            <div class="text-2xl font-bold text-dark">
                                Ksh {{ $product['price'] }}
                            </div>
                            <button class="px-4 py-2 rounded-lg bg-gradient-to-r from-secondary to-primary text-white font-medium hover:shadow-lg transition-all duration-200">
                                Add to Cart
                            </button>
                        </div>
                    </div>
                </div>
                @endforeach
                

               
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

            <div class="flex flex-1 testimonial-container overflow-x-scroll scrollbar-hide scroll-smooth p-2 md:grid-cols-2 lg:grid-cols-3 gap-8">
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
    <section id="join" class="py-16 bg-gradient-to-r from-secondary to-primary text-white">
        <div class="container mx-auto px-4 text-center">
            <div class="max-w-2xl mx-auto">
                <h2 class="text-3xl md:text-4xl font-bold mb-6">Ready to Taste the Difference?</h2>
                <p class="text-lg mb-8">Join our community of happy customers enjoying fresh, quality products every day.</p>
                <div class="flex flex-col sm:flex-row gap-4 justify-center">
                    <a href="/login" class="px-8 py-4 rounded-xl bg-white text-primary font-semibold shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-105">
                        <i class="fas fa-user-plus mr-2"></i>
                        Create Account
                    </a>
                </div>
            </div>
        </div>
    </section>
  <a href="#home" class="p-3 px-5 fixed bottom-2 animate-pulse shadow-2xl shadow-black rounded-full right-2 bg-gradient-to-br from-transparent/80 to-secondary/90  text-white text-center grid justify-center items-center ">
        <i class="fas fa-long-arrow-up animate-bounce font-extrabold"></i>
        <p class="text-xs"> Top  </p>
    </a>
    <!-- Footer -->
    <footer id="contact" class="bg-dark text-white py-12">
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
                
                <div class="flex justify-between gap-6 md:hidden">
                    <div>
                    <h3 class="font-semibold text-xs underline mb-4">Quick Links</h3>
                    <ul class="">
                        <li><a href="#home" class="text-light/70 hover:text-white transition-colors">Home</a></li>
                        <li><a href="#products" class="text-light/70 hover:text-white transition-colors">Products</a></li>
                        <li><a href="#bakery" class="text-light/70 hover:text-white transition-colors">Bakery</a></li>
                        <li><a href="#about" class="text-light/70 hover:text-white transition-colors">About Us</a></li>
                    </ul>
                </div>
                
                <div class="">
                    <h3 class="font-semibold text-xs text-end underline mb-4">Contact Us</h3>
                    <ul class="space-y-2 text-light/70   text-end">
                        <li class="flex items-center justify-end gap-2 ">
                            <i class="fas fa-map-marker-alt"></i>
                            <span>Nairobi, Kenya</span>
                        </li>
                        <li class="flex items-center justify-end gap-2">
                            <i class="fas fa-phone"></i>
                            <span>+254 712 345 678</span>
                        </li>
                        <li class="flex items-center justify-end gap-2">
                            <i class="fas fa-envelope"></i>
                            <span>info@kaykays.com</span>
                        </li>
                    </ul>
                </div>
                </div>
                <div class="hidden md:grid justify-between gap-6">
                    <h3 class="font-semibold text-lg ">Quick Links</h3>
                    <ul class="space-y-2">
                        <li><a href="#home" class="text-light/70 hover:text-white transition-colors">Home</a></li>
                        <li><a href="#products" class="text-light/70 hover:text-white transition-colors">Products</a></li>
                        <li><a href="#bakery" class="text-light/70 hover:text-white transition-colors">Bakery</a></li>
                        <li><a href="#about" class="text-light/70 hover:text-white transition-colors">About Us</a></li>
                    </ul>
                </div>
                
                <div class="hidden md:grid justify-between gap-6">
                    <h3 class="font-semibold text-lg ">Contact Us</h3>
                    <ul class="space-y-2 text-light/70">
                        <li class="flex items-center gap-2">
                            <a href="https://www.google.com/maps/place/1%C2%B012'45.4%22S+36%C2%B050'11.5%22E/@-1.212613,36.8358893,19z/data=!3m1!4b1!4m4!3m3!8m2!3d-1.212613!4d36.836533?entry=ttu&g_ep=EgoyMDI1MTEwOS4wIKXMDSoASAFQAw%3D%3D" class="flex items-center gap-2">
                            <i class="fas fa-map-marker-alt"></i>
                            <span>Nairobi, Kenya</span>
                            </a>
                        </li>
                        <li class="flex items-center gap-2">
                           <a href="tel:+254796220813" class="flex items-center gap-2">
                             <i class="fas fa-phone"></i>
                            <span>+254 796 220 813</span>
                           </a>
                        </li>
                        <li class="flex items-center gap-2">
                            <a href="mailto:info@kaykays.com" class="flex items-center gap-2">
                                <i class="fas fa-envelope"></i>
                            <span>info@kaykays.com</span>
                            </a>
                        </li>
                    </ul>
                </div>
                

                @php
                $socialLinks = [
                    [
                        'name' => 'Facebook',
                        'icon' => "fab fa-facebook-f",
                        'link' => 'https://www.facebook.com',
            ],
            [
                        'name' => 'Instagram',
                        'icon' => 'fab fa-instagram',
                        'link' => 'https://www.instagram.com',
            
            ],
            [
                        'name' => 'Whatsapp',
                        'icon' => 'fab fa-whatsapp',
                        'link' => 'https://www.whatsapp.com',
            
            ],
            [
                        'name' => 'Twitter',
                        'icon' => 'fab fa-twitter',
                        'link' => 'https://www.twitter.com',
            ]
                ]
                @endphp
                <div class='flex flex-col  items-center gap-4'>
                    <h3 class="font-semibold text-lg mb-4">Follow Us</h3>
                    <div class="flex gap-4">
                        @foreach($socialLinks as $link)
                        <a href={{ $link['link'] }} class="h-10 w-10 rounded-full bg-light/10 flex items-center justify-center bg-primary/20 hover:bg-primary transition-colors">
                        
                            <i class="{{ $link['icon'] }}"></i>
                        </a>
                        @endforeach

                    </div>
                </div>
            </div>
            
            <div class="border-t border-light/20 mt-8 pt-8 text-center text-light/70">
                <p>&copy; @php echo date('Y'); @endphp KayKay's. All rights reserved. Fresh daily products & bakery delights.</p>
            </div>
        </div>
    </footer>

  
    <script>
        // Mobile menu toggle
        document.getElementById('mobile-menu-button').addEventListener('click', function() {
            const menu = document.getElementById('mobile-menu');
            menu.classList.toggle('hidden');Quick
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

    <script>
        

        const dailySection = document.getElementById('daily');

       

    </script>
</body>
</html>