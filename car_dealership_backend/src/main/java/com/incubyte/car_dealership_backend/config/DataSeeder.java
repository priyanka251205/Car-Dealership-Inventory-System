package com.incubyte.car_dealership_backend.config;

import com.incubyte.car_dealership_backend.entity.Role;
import com.incubyte.car_dealership_backend.entity.User;
import com.incubyte.car_dealership_backend.entity.Vehicle;
import com.incubyte.car_dealership_backend.repository.UserRepository;
import com.incubyte.car_dealership_backend.repository.VehicleRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
@RequiredArgsConstructor
public class DataSeeder implements CommandLineRunner {

    private final UserRepository userRepository;
    private final VehicleRepository vehicleRepository;
    private final PasswordEncoder passwordEncoder;

    @Override
    public void run(String... args) {
        // Seed Admin User
        User admin = userRepository.findByEmail("admin@gmail.com").orElse(null);
        if (admin == null) {
            admin = User.builder()
                    .name("Admin")
                    .email("admin@gmail.com")
                    .password(passwordEncoder.encode("admin123"))
                    .role(Role.ADMIN)
                    .build();
        } else {
            admin.setRole(Role.ADMIN);
            admin.setPassword(passwordEncoder.encode("admin123"));
        }
        userRepository.save(admin);
        System.out.println("✅ Admin Ready");

        // Seed Vehicles only if empty
        if (vehicleRepository.count() == 0) {
            List<Vehicle> seededVehicles = List.of(
                Vehicle.builder()
                    .make("Toyota")
                    .model("Fortuner")
                    .category("SUV")
                    .price(3800000)
                    .quantity(5)
                    .imageUrl("https://images.unsplash.com/photo-1626379616459-b2ce1d9decbc?auto=format&fit=crop&w=800&q=80")
                    .year(2023)
                    .description("A premium, robust SUV with legendary durability and outstanding off-road capability.")
                    .build(),
                Vehicle.builder()
                    .make("Honda")
                    .model("City")
                    .category("Sedan")
                    .price(1500000)
                    .quantity(8)
                    .imageUrl("https://images.unsplash.com/photo-1542282088-fe8426682b8f?auto=format&fit=crop&w=800&q=80")
                    .year(2022)
                    .description("A refined sedan offering excellent mileage, premium cabin comfort, and advanced tech.")
                    .build(),
                Vehicle.builder()
                    .make("Hyundai")
                    .model("Creta")
                    .category("SUV")
                    .price(1700000)
                    .quantity(12)
                    .imageUrl("https://images.unsplash.com/photo-1617788138017-80ad40651399?auto=format&fit=crop&w=800&q=80")
                    .year(2023)
                    .description("India's favorite mid-size SUV featuring a bold design, panoramic sunroof, and modern tech.")
                    .build(),
                Vehicle.builder()
                    .make("Tata")
                    .model("Nexon")
                    .category("SUV")
                    .price(1200000)
                    .quantity(15)
                    .imageUrl("https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&w=800&q=80")
                    .year(2024)
                    .description("A highly popular compact SUV offering a 5-star safety rating, turbocharged engine, and bold stance.")
                    .build(),
                Vehicle.builder()
                    .make("Mahindra")
                    .model("XUV700")
                    .category("SUV")
                    .price(2400000)
                    .quantity(6)
                    .imageUrl("https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=800&q=80")
                    .year(2023)
                    .description("A premium 7-seater SUV with ADAS, dual-screen display, and powerful diesel and petrol engines.")
                    .build(),
                Vehicle.builder()
                    .make("BMW")
                    .model("3 Series")
                    .category("Sports")
                    .price(4900000)
                    .quantity(3)
                    .imageUrl("https://images.unsplash.com/photo-1555215695-3004980ad54e?auto=format&fit=crop&w=800&q=80")
                    .year(2023)
                    .description("A sporty luxury sedan featuring precise handling, a turbocharged inline-4 engine, and a driver-focused cockpit.")
                    .build(),
                Vehicle.builder()
                    .make("Mercedes-Benz")
                    .model("C-Class")
                    .category("Sedan")
                    .price(5800000)
                    .quantity(4)
                    .imageUrl("https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?auto=format&fit=crop&w=800&q=80")
                    .year(2024)
                    .description("A luxurious sedan offering exceptional comfort, high-quality materials, and cutting-edge MBUX screens.")
                    .build(),
                Vehicle.builder()
                    .make("Audi")
                    .model("A6")
                    .category("Sedan")
                    .price(6200000)
                    .quantity(2)
                    .imageUrl("https://images.unsplash.com/photo-1606016159991-dfe4f2746ad5?auto=format&fit=crop&w=800&q=80")
                    .year(2022)
                    .description("An executive luxury sedan with Quattro all-wheel drive, dual touchscreen interfaces, and a smooth ride.")
                    .build(),
                Vehicle.builder()
                    .make("Kia")
                    .model("Seltos")
                    .category("SUV")
                    .price(1600000)
                    .quantity(10)
                    .imageUrl("https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?auto=format&fit=crop&w=800&q=80")
                    .year(2023)
                    .description("A smart, connected SUV offering a modern aesthetic, ventilated seats, and diverse engine options.")
                    .build(),
                Vehicle.builder()
                    .make("MG")
                    .model("Hector")
                    .category("SUV")
                    .price(1900000)
                    .quantity(7)
                    .imageUrl("https://images.unsplash.com/photo-1563720223185-11003d516935?auto=format&fit=crop&w=800&q=80")
                    .year(2023)
                    .description("A tech-laden SUV featuring a massive portrait touchscreen, internet connectivity, and spacious seating.")
                    .build(),
                Vehicle.builder()
                    .make("Skoda")
                    .model("Octavia")
                    .category("Sedan")
                    .price(2700000)
                    .quantity(4)
                    .imageUrl("https://images.unsplash.com/photo-1603584173870-7f23fdae1b7a?auto=format&fit=crop&w=800&q=80")
                    .year(2022)
                    .description("A premium sedan known for its elegant design, build quality, and cavernous cargo capacity.")
                    .build(),
                Vehicle.builder()
                    .make("Volkswagen")
                    .model("Virtus")
                    .category("Sedan")
                    .price(1600000)
                    .quantity(9)
                    .imageUrl("https://images.unsplash.com/photo-1541899481282-d53bffe3c35d?auto=format&fit=crop&w=800&q=80")
                    .year(2024)
                    .description("A sporty sedan engineered for performance and safety, featuring a powerful TSI engine.")
                    .build(),
                Vehicle.builder()
                    .make("Toyota")
                    .model("Camry")
                    .category("Sedan")
                    .price(4500000)
                    .quantity(3)
                    .imageUrl("https://images.unsplash.com/photo-1621007947382-cc34aa864ee3?auto=format&fit=crop&w=800&q=80")
                    .year(2023)
                    .description("A luxurious self-charging hybrid sedan providing outstanding efficiency and executive comfort.")
                    .build(),
                Vehicle.builder()
                    .make("Honda")
                    .model("Amaze")
                    .category("Sedan")
                    .price(900000)
                    .quantity(11)
                    .imageUrl("https://images.unsplash.com/photo-1583121274602-3e2820c69888?auto=format&fit=crop&w=800&q=80")
                    .year(2023)
                    .description("A compact sedan designed for city driving with a smooth CVT gearbox and a spacious cabin.")
                    .build(),
                Vehicle.builder()
                    .make("Hyundai")
                    .model("i20")
                    .category("Hatchback")
                    .price(1000000)
                    .quantity(14)
                    .imageUrl("https://images.unsplash.com/photo-1605559424843-9e4c228bf1c2?auto=format&fit=crop&w=800&q=80")
                    .year(2024)
                    .description("A premium hatchback featuring a sporty design, digital cluster, and advanced safety features.")
                    .build(),
                Vehicle.builder()
                    .make("Tata")
                    .model("Altroz")
                    .category("Hatchback")
                    .price(850000)
                    .quantity(10)
                    .imageUrl("https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&w=800&q=80")
                    .year(2023)
                    .description("The gold standard of hatchbacks offering a 5-star global NCAP rating and excellent ride dynamics.")
                    .build(),
                Vehicle.builder()
                    .make("Mahindra")
                    .model("Thar")
                    .category("SUV")
                    .price(1650000)
                    .quantity(8)
                    .imageUrl("https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&w=800&q=80")
                    .year(2023)
                    .description("An iconic 4x4 off-roader designed to conquer any terrain with high ground clearance and rugged build.")
                    .build(),
                Vehicle.builder()
                    .make("BMW")
                    .model("M4")
                    .category("Sports")
                    .price(14000000)
                    .quantity(1)
                    .imageUrl("https://images.unsplash.com/photo-1617814076367-b759c7d7e738?auto=format&fit=crop&w=800&q=80")
                    .year(2024)
                    .description("A high-performance track-focused sports coupe with a twin-turbo inline-6 and aggressive styling.")
                    .build(),
                Vehicle.builder()
                    .make("Mercedes-Benz")
                    .model("AMG E 63")
                    .category("Sports")
                    .price(17000000)
                    .quantity(1)
                    .imageUrl("https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?auto=format&fit=crop&w=800&q=80")
                    .year(2023)
                    .description("A super-sedan featuring a handcrafted biturbo V8 engine, producing racetrack-ready power.")
                    .build(),
                Vehicle.builder()
                    .make("Audi")
                    .model("e-tron")
                    .category("SUV")
                    .price(10200000)
                    .quantity(2)
                    .imageUrl("https://images.unsplash.com/photo-1606016159991-dfe4f2746ad5?auto=format&fit=crop&w=800&q=80")
                    .year(2023)
                    .description("A fully electric luxury SUV offering advanced battery tech, virtual mirrors, and high charging speeds.")
                    .build(),
                Vehicle.builder()
                    .make("Kia")
                    .model("EV6")
                    .category("Sports")
                    .price(6500000)
                    .quantity(3)
                    .imageUrl("https://images.unsplash.com/photo-1563720223185-11003d516935?auto=format&fit=crop&w=800&q=80")
                    .year(2024)
                    .description("An all-electric crossover offering blisteringly fast acceleration and futuristic styling.")
                    .build(),
                Vehicle.builder()
                    .make("MG")
                    .model("Comet EV")
                    .category("Hatchback")
                    .price(700000)
                    .quantity(15)
                    .imageUrl("https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&w=800&q=80")
                    .year(2024)
                    .description("An ultra-compact electric hatchback designed for effortless urban commuting and tight parking spaces.")
                    .build(),
                Vehicle.builder()
                    .make("Skoda")
                    .model("Superb")
                    .category("Sedan")
                    .price(3600000)
                    .quantity(3)
                    .imageUrl("https://images.unsplash.com/photo-1603584173870-7f23fdae1b7a?auto=format&fit=crop&w=800&q=80")
                    .year(2023)
                    .description("A luxury sedan offering class-leading legroom, high-end materials, and refined ride quality.")
                    .build(),
                Vehicle.builder()
                    .make("Volkswagen")
                    .model("Taigun")
                    .category("SUV")
                    .price(1800000)
                    .quantity(8)
                    .imageUrl("https://images.unsplash.com/photo-1541899481282-d53bffe3c35d?auto=format&fit=crop&w=800&q=80")
                    .year(2024)
                    .description("A dynamic German-engineered mid-size SUV with excellent high-speed stability and safety features.")
                    .build(),
                Vehicle.builder()
                    .make("Toyota")
                    .model("Glanza")
                    .category("Hatchback")
                    .price(850000)
                    .quantity(12)
                    .imageUrl("https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?auto=format&fit=crop&w=800&q=80")
                    .year(2023)
                    .description("A smart city hatchback with excellent fuel efficiency, smooth engine, and low maintenance cost.")
                    .build(),
                Vehicle.builder()
                    .make("Tata")
                    .model("Safari")
                    .category("SUV")
                    .price(2500000)
                    .quantity(5)
                    .imageUrl("https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&w=800&q=80")
                    .year(2024)
                    .description("A premium 6/7-seater SUV built on Land Rover lineage, offering absolute luxury and safety.")
                    .build(),
                Vehicle.builder()
                    .make("Mahindra")
                    .model("Scorpio-N")
                    .category("SUV")
                    .price(2100000)
                    .quantity(7)
                    .imageUrl("https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=800&q=80")
                    .year(2023)
                    .description("The big daddy of SUVs offering commanding seating, robust ladder-frame chassis, and 4WD capability.")
                    .build(),
                Vehicle.builder()
                    .make("BMW")
                    .model("i7")
                    .category("Sedan")
                    .price(20000000)
                    .quantity(1)
                    .imageUrl("https://images.unsplash.com/photo-1555215695-3004980ad54e?auto=format&fit=crop&w=800&q=80")
                    .year(2024)
                    .description("The pinnacle of electric luxury featuring a massive rear theater screen and ultra-comfortable lounge seats.")
                    .build()
            );

            vehicleRepository.saveAll(seededVehicles);
            System.out.println("✅ " + seededVehicles.size() + " Vehicles Seeded successfully");
        }
    }
}