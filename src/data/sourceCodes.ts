export const JAVA_HOMEWORK_CODE = `/**
 * =========================================================================
 * ALGORİTMA VE PROGRAMLAMA DERSİ ÖDEV PROJESİ
 * =========================================================================
 * @konu   : Bir Sayının Basamak Sayılarının Toplamını Hesaplayan Program
 * @örnek  : 1643 = 1 + 6 + 4 + 3 = 14
 * @yazar  : Enes Öztürk
 * @tarih  : 2026
 * =========================================================================
 */

import java.util.Scanner;

public class BasamakToplami {
    public static void main(String[] args) {
        // Kullanıcıdan veri girişi almak için Scanner nesnesi oluşturulur
        Scanner input = new Scanner(System.in);

        System.out.println("=================================================");
        System.out.println("   BASAMAK SAYILARI TOPLAMI HESAPLAMA PROGRAMI   ");
        System.out.println("              Hazırlayan: Enes Öztürk            ");
        System.out.println("=================================================");
        
        System.out.print("Lütfen bir tam sayı giriniz: ");
        int number = input.nextInt();

        // Orijinal sayıyı korumak için geçici değişkene aktarıyoruz
        int tempNumber = Math.abs(number); // Negatif sayılar için mutlak değer
        int basValue;
        int toplam = 0;
        int basamakSayisi = 0;

        // Döngü ile her adımda son basamağı alıp toplama ekliyoruz
        while (tempNumber != 0) {
            // Bir sayının 10'a bölümünden kalan (%10), sayının son basamağını verir
            basValue = tempNumber % 10;
            
            // Elde edilen basamağı kümülatif toplama dahil ediyoruz
            toplam += basValue;

            // Sayıyı 10'a tam bölerek (/10) işlenen son basamağı atıyoruz
            tempNumber /= 10;

            basamakSayisi++;
        }

        // Sonuçları ekrana yazdırma
        System.out.println("-------------------------------------------------");
        System.out.println("Girilen Sayı       : " + number);
        System.out.println("Basamak Sayısı     : " + (number == 0 ? 1 : basamakSayisi));
        System.out.println("Basamaklar Toplamı : " + toplam);
        System.out.println("-------------------------------------------------");
        System.out.println("Ödev Başarıyla Tamamlandı. İmza: Enes Öztürk");

        // Scanner kaynağını kapatıyoruz
        input.close();
    }
}`;

export const JAVA_ARMSTRONG_CODE = `/**
 * =========================================================================
 * ARMSTRONG SAYI KONTROL PROGRAMI
 * =========================================================================
 * @tanım  : N haneli bir sayının basamaklarının n'inci üstlerinin toplamı,
 *           sayının kendisine eşitse, böyle sayılara Armstrong sayı denir.
 * @örnek  : 407 = 4^3 + 0^3 + 7^3 = 64 + 0 + 343 = 407
 * @yazar  : Enes Öztürk
 * =========================================================================
 */

import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner input = new Scanner(System.in);
        System.out.print("Sayı Giriniz: ");
        int number = input.nextInt();
        
        int basNumber = 0;
        int tempNumber = number;
        int basValue;
        int result = 0;
        int basPow;

        // 1. ADIM: Sayının kaç basamaklı olduğunu bulma
        while (tempNumber != 0) {
            tempNumber /= 10;
            basNumber++;
        }

        // 2. ADIM: Her basamağın basNumber'ıncı kuvvetini alıp toplama ekleme
        tempNumber = number;
        while (tempNumber != 0) {
            basValue = tempNumber % 10;
            
            // basPow = basValue^basNumber
            basPow = 1;
            for (int i = 1; i <= basNumber; i++) {
                basPow *= basValue;
            }
            
            result += basPow;
            tempNumber /= 10;
        }

        // 3. ADIM: Sonucu kontrol etme
        if (result == number) {
            System.out.println(number + " sayısı bir Armstrong sayıdır.");
        } else {
            System.out.println(number + " sayısı bir Armstrong sayısı değildir.");
        }

        input.close();
    }
}`;

export const PYTHON_HOMEWORK_CODE = `# Basamak Sayıları Toplamı - Enes Öztürk
def basamak_toplami(sayi: int) -> int:
    sayi = abs(sayi)
    toplam = 0
    temp = sayi
    
    while temp != 0:
        basamak = temp % 10
        toplam += basamak
        temp //= 10
        
    return toplam

sayi = int(input("Sayı Giriniz: "))
print(f"{sayi} sayısının basamakları toplamı: {basamak_toplami(sayi)}")
# Hazırlayan: Enes Öztürk
`;

export const CPP_HOMEWORK_CODE = `// Basamak Sayıları Toplamı - Enes Öztürk
#include <iostream>
#include <cmath>

using namespace std;

int main() {
    int sayi, temp, basamak, toplam = 0;
    cout << "Sayi Giriniz: ";
    cin >> sayi;

    temp = abs(sayi);
    while (temp != 0) {
        basamak = temp % 10;
        toplam += basamak;
        temp /= 10;
    }

    cout << "Basamaklar Toplami: " << toplam << endl;
    cout << "Imza: Enes Ozturk" << endl;
    return 0;
}
`;
