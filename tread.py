import time
from queue import Queue
from threading import Thread
from random import randint
import aiohttp, asyncio, requests

ses = requests.Session()

######## darsad ###########
num_darsad_fo_r = 1
num_darsad_kh_r = 1
num_darsad_fo_u = 1
num_darsad_kh_u = 1
######### حد ضرر #############

darsad_fo_r_z = 1.01
darsad_kh_r_z = 0.99
darsad_fo_u_z = 1.0075
darsad_kh_u_z = 0.9925

l_arz_no_moamele = ['DAI','USDC','GALA','CVC', 'BUSD', 'NMR','1M_BTTUSDT', 'T']
l_telegram = []
start_ = False
dele = ''
def telegram_get():
    def telegram_(id_,aaa):
        url = f'https://api.telegram.org/bot5078004364:AAFXEuQrLcFPCM4_OBd-qKcgUXe0Z9gZanQ/sendMessage?chat_id={id_}&text={aaa}'
        response = ses.post(url, timeout = 2)

    try:
        while True:

            url = f"https://api.telegram.org/bot5078004364:AAFXEuQrLcFPCM4_OBd-qKcgUXe0Z9gZanQ/getUpdates?limit=10{dele}"
            response = requests.request("GET", url, timeout = 2).json()
            if response['ok']== True:
                for i in (response['result']):
                    update_id = i['update_id']
                    message = i['message']['text']
                    id_ = i['message']['from']['id']
                    if not start_ :
                        l_telegram.append(update_id)
                        continue
                    if update_id not in l_telegram:
                        l_telegram.append(update_id)
                        try:

                            message= message.split(' ')
                            code_ = message[0]
                            mess = message[1]
                            print(message)
                            if code_ == 'on' and mess.upper() in arzha and mess.upper() not in l_arz_no_moamele:
                                l_arz_no_moamele.append(mess.upper())
                                telegram_(id_, f'{l_arz_no_moamele}')
                                print(l_arz_no_moamele)
                            elif code_ == 'off' and mess.upper() in arzha and mess.upper()  in l_arz_no_moamele:

                                l_arz_no_moamele.remove(mess.upper())
                                telegram_(id_, f'{l_arz_no_moamele}')
                                print(l_arz_no_moamele)
                            elif code_ == 'token':
                                telegram_(id_, f'{message}')
                                print('change token', message)
                                globals()['nobi'] = Nobitex(mess)
                            elif code_ == 'tread' and mess in ['False', 'True']:
                                telegram_(id_, f'{message}')
                                globals()['tread'] = eval(mess)
                            elif code_ == 'fo':
                                mess = float(mess)
                                
                                globals()['num_darsad_fo_r'] = mess
                                globals()['num_darsad_fo_u'] = mess
                                
                                globals()['darsad_fo_r_z'] = 1.005 + (mess/100)
                                globals()['darsad_fo_u_z'] = 1.0025 + (mess/100)
                                
                                telegram_(id_, f'{message}')
                            elif code_ == 'kh':
                                mess = float(mess)
                                globals()['num_darsad_kh_r'] = mess
                                globals()['num_darsad_kh_u'] = mess
                                
                                globals()['darsad_kh_r_z'] = 0.995 - (mess/100)
                                globals()['darsad_kh_u_z'] = 0.9975 - (mess/100)
                                telegram_(id_, f'{message}')






                        except Exception as r:
                            print('error message telegram', r)
            globals()['start_'] = True
            globals()['dele'] = f'&offset={update_id}'
            time.sleep(5)

    except Exception as r:
        print('error telegram_get ', r)
        time.sleep(15)
        Thread(target=telegram_get).start()
Thread(target=telegram_get).start()
class Nobitex:

    '''python package for nobitex api'''

    __BASE_URL = 'https://api.nobitex.ir/'

    def __init__(self, token):
        self.token = token

    def order_book(self):
        """برای دریافت لیست سفارشات از این نوع درخواست استفاده نمایید"""

        url = self.__BASE_URL + 'v2/orderbook/all'

        response = ses.get(url, timeout = 2)

        return response.json()

    def wallet_list(self):
        try:

            """برای دریافت لیست کیف پول های کاربر از این نوع درخواست استفاده نمایید"""

            url = self.__BASE_URL + 'users/wallets/list'

            headers = {
                'Authorization': 'Token ' + self.token
            }

            response = ses.post(url, headers=headers, timeout = 2).json()
##            print(response['wallets'][3])
            return {i['currency'].upper():
                    {
                        'balance': float(i['balance']),
                     'activeBalance': float(i['activeBalance']),
                        'depositInfo' : i['depositInfo']} for
                    i in
                    response['wallets']}
        except Exception as r:
            print('error wallet', r)
    def deposits_list(self):
        """برای دریافت لیست واریزها و برداشت‌ها از این نوع درخواست استفاده نمایید"""

        url = self.__BASE_URL + 'users/wallets/deposits/list'

        headers = {
            'Authorization': 'Token ' + self.token
        }

        response = ses.post(url, headers=headers, timeout = 2)

        return response.json()

    def withdraws_list(self):
        """برای دریافت لیست واریزها و برداشت‌ها از این نوع درخواست استفاده نمایید"""

        url = self.__BASE_URL + 'users/wallets/withdraws/list'

        headers = {
            'Authorization': 'Token ' + self.token
        }

        response = ses.post(url, headers=headers, timeout = 2)

        return response.json()

    def add_order(self, type, src_currency, dst_currency, amount, price):
        """برای ثبت سفارش معامله در بازار نوبیتکس از این درخواست استفاده نمایید.
        ثبت سفارش الزاماً به معنی انجام معامله نیست و بسته به نوع و قیمت سفارش و وضعیت لحظه‌ای بازار ممکن است معامله انجام
شود یا نشود. با درخواست «وضعیت سفارش» می‌توانید از وضعیت سفارش خود مطلع شوید.
سفارش‌ها پس از ثبت، پیش از ورود به دفتر معاملاتی و انجام معامله، مجدداً از نظر اعتبار مورد بررسی قرار گرفته و در صورت
        نامعتبر بودن، به وضعیت «رد شده» برده خواهند شد. به همین علت در صورتی که سفارش‌های شما ثبت می‌شود ولی بلافاصله به
        وضعیت «رد شده» تغییر حالت پیدا می‌کنند، پارامترهای ارسالی خود به ویژه مقدار و قیمت سفارش و موجودی حساب خود را دقیق‌تر
        بررسی نمایید

                type = sell or buy

            src_currency --> ارز مبدا BTC,ETH, . . .
            dst_currency --> ارز مقصد rls, usdt
            amount --> مقدار
            price --> قیمت"""
        try:

            url = self.__BASE_URL + 'market/orders/add'

            payload = {'type': type,
                       'execution': 'limit',
                       'srcCurrency': src_currency,
                       'dstCurrency': dst_currency,
                       'amount': amount,
                       'price': price,
                       'pro' : 'yes'
                       }

            headers = {
                'Authorization': 'Token ' + self.token
            }

            response = ses.post(url, headers=headers, data=payload, timeout = 2).json()
            print(response)
            return response
        except Exception as r:
            print('error add_order ', r)
    def order_status(self, idd):
        try:

            """برای دریافت وضعیت سفارش از این نوع درخواست استفاده نمایید"""

            url = self.__BASE_URL + 'market/orders/status'

            payload = {'id': idd}

            headers = {
                'Authorization': 'Token ' + self.token
            }

            response = ses.post(url, headers=headers, data=payload, timeout = 2)

            return response.json()
        except Exception as r:
            print('error order_status ', r)
    def update_status(self, idd):
        """برای به روزرسانی سفارش از این تابع استفاده کنید"""
        try:

            url = self.__BASE_URL + 'market/orders/update-status'

            payload = {'order': idd,
                       'status': "canceled"}

            headers = {
                'Authorization': 'Token ' + self.token
            }

            response = ses.post(url, headers=headers, data=payload, timeout = 2)

            return response.json()
        except Exception as r:
            print('error update_status ', r)
    def arzha_(self, p_):
        arz_bnb = [i for i in p_ if i != 'status' and 'IRT' not in i and p_[i]['bids'] != []]
        arzha = [i[:-4] for i in arz_bnb]
        arz_nobi = [i for i in p_ if i != 'status' and p_[i]['bids'] != []]
        return arzha, arz_bnb, arz_nobi


def arzha_():
    global arzha, arz_bnb, arz_nobi
    p_ = requests.request("GET", "https://api.nobitex.ir/v2/orderbook/all").json()
    l_pop = [i for i in p_ if 'bids' not in p_[i] or  len(p_[i]['bids']) < 5 or 'GALA' in i or '1INCH' in i or '1B_BABYDOGEUSDT' in i or '1M_BTTUSDT' in i or '1M_NFTUSDT' in i or '100K_FLOKIUSDT' in i or 'CVC' in i  ]
    for i in l_pop:
        p_.pop(i)
    
    print('the order is weak' , l_pop)
    arz_bnb = [i for i in p_ if'IRT' not in i ]
    
    arzha = [i[:-4] for i in arz_bnb]
    
    arz_nobi = [i for i in p_]
    return arzha, arz_bnb, arz_nobi

arzha, arz_bnb, arz_nobi = arzha_()
urls = [
    "https://api.binance.com/api/v3/ticker/price",
    "https://api.nobitex.ir/v2/orderbook/all"
]
for i in arz_bnb:
    exec(f'{i}  = []')
    exec(f'{i[:-4]}  = None')
    exec(f'{i[:-4]}sellrls  = False')
    exec(f'{i[:-4]}buyrls  = False')
    exec(f'{i[:-4]}sellusdt  = False')
    exec(f'{i[:-4]}buyusdt  = False')


async def get_page(session, url):
    async with session.get(url, ssl = False) as r:
        response = await r.json()
##        print(response)
        if url == "https://api.binance.com/api/v3/ticker/price":
            bnb = response

            def f(n):
                try:

                    return bnb[n]['symbol'][:-4], float(bnb[n]['price'])
                except:
                    pass

            def g(n) -> bool:
                try:

                    return bnb[n]['symbol'] in arz_bnb
                except:
                    pass

            dd = dict(map(f, filter(g, range(len(bnb)))))

            return 'binance', dd
        else:
##            print(response)
            response.pop('status')
            p_n = {}
            for i in response:
                try:
                        
                    if i in arz_nobi:

                        a = response[i]
                        p_n[i] = [float(a["bids"][0][0]), float(a['asks'][0][0])]
                except Exception as r :
                    print ('error while get price ', r)
            p_n['SHIBIRT'] = [p_n['SHIBIRT'][0] / 1000, p_n['SHIBIRT'][1] / 1000]
            p_n['SHIBUSDT'] = [p_n['SHIBUSDT'][0] / 1000, p_n['SHIBUSDT'][1] / 1000]
            p_n['nobitex'] = response
            return 'nobitex', p_n


async def get_all(session, urls):
    tasks = []
    for url in urls:
        task = asyncio.create_task(get_page(session, url))
        tasks.append(task)
    results = await asyncio.gather(*tasks)
    return results


async def main(urls):
    async with aiohttp.ClientSession() as session:
        data = await get_all(session, urls)
        return data


def price():
    try:

        global last_p

        loop = asyncio.get_event_loop()
        a = loop.run_until_complete(main(urls))
        d = dict(a)
        ##        if last_p == d['nobitex']:
        ##            return False
        ##        last_p = d['nobitex']

        return d
    except:

        print('مشکل price')
        return False


####################################


###################################
def get_darsad():
    try:

        all_orderr = []
        all_p_ = price()
        if not all_p_:
            print('price not get new price')
            return

        all_p = all_p_.copy()

        bnb_pp = all_p['binance']
        usdt_fo = all_p['nobitex']['USDTIRT'][0] * 1.002
        usdt_kh = all_p['nobitex']['USDTIRT'][1] * 0.998
        for i in bnb_pp:
            if i + 'IRT' not in arz_nobi or i + 'USDT' not in arz_nobi or i == 'DAI':
                continue

            fo_bnb = bnb_pp[i] * 1.001
            kh_bnb = bnb_pp[i] * 0.999
            nobi_fo_r = all_p['nobitex'][i + 'IRT'][0] * 1.002
            nobi_kh_r = all_p['nobitex'][i + 'IRT'][1] * 0.998
            nobi_fo_u = all_p['nobitex'][i + 'USDT'][0] * 1.0015
            nobi_kh_u = all_p['nobitex'][i + 'USDT'][1] * 0.9985

            fo_r = (((nobi_kh_r / usdt_fo) / fo_bnb) - 1) * 100
            kh_r = ((kh_bnb / (nobi_fo_r / usdt_kh)) - 1) * 100
            fo_u = (((nobi_kh_u) / fo_bnb) - 1) * 100
            kh_u = ((kh_bnb / (nobi_fo_u)) - 1) * 100
            all_orderr.append([fo_r, i, 'fo_r', 'asks'])
            all_orderr.append([kh_r, i, 'kh_r', 'bids'])
            all_orderr.append([fo_u, i, 'fo_u', 'asks'])
            all_orderr.append([kh_u, i, 'kh_u', 'bids'])
        all_orderr.sort(reverse=True)
        return all_p, all_orderr
    except Exception as r:
        print('error get_darsad ', r)

def final():
    try:

        get_darsad_ = get_darsad()
        if not get_darsad_:
            print('get darsad not work!!!')
            return
        p_all, d_all = get_darsad_
        alarm_telegram = 'Alarm Darsad\n'
        for i in d_all:
            target = i
            arz = target[1]
            darsad_ = target[0]
            market = target[2]
            b_a = target[3]

            if arz in l_arz_no_moamele  and 'kh' in market \
                    or eval('num_darsad_' + market) > darsad_:
                continue
            
            ############# Alarm Darsad #####################

            u_i = 'USDT' if '_u' in market else 'IRT'
            u_r = 'usdt' if '_u' in market else 'rls'
            b_nobi = 'sell' if 'fo' in market else 'buy'
            b_bnb = 'sell' if 'kh' in market else 'buy'
            p_bnb = p_all['binance'][arz] if arz != 'SHIB' else p_all['binance'][arz]*1000
            p_usdt = \
                p_all['nobitex']['USDTIRT'][0] if market == 'fo_r' else \
                    p_all['nobitex']['USDTIRT'][1] if market == 'kh_r' else 1

            # coefficient Loss limit
            z_darsad = \
                1.005 + ((darsad_ * 0.8) / 100) if market == 'fo_r' else \
                    1.0025 + ((darsad_ * 0.8) / 100) if market == 'fo_u' else \
                        0.995 - ((darsad_ * 0.8) / 100) if market == 'kh_r' else \
                            0.9975 - ((darsad_ * 0.8) / 100)  # if market == 'kh_u'

            ################################################################################
            t_f_z_darsad = \
                True if 'fo' in market and z_darsad > eval('darsad_' + market + '_z') else \
                    True if 'kh' in market and z_darsad < eval('darsad_' + market + '_z') else \
                        False
            z_darsad = z_darsad if t_f_z_darsad else eval('darsad_' + market + '_z')

            p_nobi = p_bnb * z_darsad * p_usdt

            t_f_p_nobi = \
                False if 'fo' in market and p_all['nobitex'][arz + u_i][0] < p_nobi else \
                    False if 'kh' in market and p_all['nobitex'][arz + u_i][1] > p_nobi else \
                        True

            bd_ak = p_all['nobitex']['nobitex'][arz + u_i][b_a]
            m_order = float(bd_ak[0][1]) + float(bd_ak[1][1])
            m_mojodi = m_all[arz]['activeBalance'] if 'fo' in market else \
                m_all[u_r.upper()]['activeBalance'] / p_nobi
            m_order_ = min(m_order, m_mojodi) * 0.9995

            m_frezz = (m_order_, arz) if 'fo' in market else ((p_nobi * m_order_ * 1.005), u_r.upper())

            m_all[m_frezz[1]]['activeBalance'] -= m_frezz[0]

            if m_order_ * p_bnb > 20 and not eval(arz + b_nobi + u_r):
                globals()[arz + b_nobi + u_r] = True
                yield darsad_, b_nobi, arz, u_r, m_order_, p_nobi, m_frezz

    except Exception as r:
        print('error final ', r)
def order_final(pak):
    try:

        darsad_, b_nobi, arz, u_r, m_order_, p_nobi, m_frezz = pak
        print(pak)
        add = nobi.add_order(b_nobi, arz.lower(), u_r, m_order_, p_nobi)
        time.sleep(2)
        idd = add['order']['id']

        price_order = float(add['order']['price'])
        amount_order = float(add['order']['amount'])
        nobi.update_status(idd)
        o_s = nobi.order_status(idd)

        matchedAmount = float(o_s['order']['matchedAmount'])
        if matchedAmount > 0:
            time.sleep(randint(1, 20) / 10)
            telegram_tread(f"{arz}\n\n{b_nobi}{u_r}\n\n{matchedAmount}", 'new_tread')
        else:
            telegram_tread(f"{arz}\n\n{b_nobi, u_r}\n\n{m_order_}\n you have agahi but you not win to tread any of it ",
                           'new_tread')

        m_free = (m_order_ - matchedAmount) if b_nobi == 'sell' else ((m_order_ * p_nobi*1.005) - (matchedAmount * price_order))
        m_all[m_frezz[1].upper()]['activeBalance'] += m_free
        globals()[arz + b_nobi + u_r] = False
    except Exception as r:
        print('error order_final ', r)

def telegram_tread(aaa, canall):
    url = f"https://api.telegram.org/bot5155626848:AAEasYI0FfZAAYj28Tf_TQkCgeA_f5XZr3I/sendMessage?chat_id=@{canall}&text={aaa}"
    response = ses.post(url, timeout = 2)

tread = True
nobi = Nobitex('555')
m_all = nobi.wallet_list()
###############################################
for i in m_all :
    if 'BSC' not  in  m_all[i]['depositInfo'] and\
       i != 'XRP' and\
       i not in l_arz_no_moamele :
        l_arz_no_moamele.append(i)








###############################################
t_m = time.time()
telegram_tread(f"sssss", 'new_tread')
while True:
    try:

        if time.time() - t_m > 15:
            print('*' * 50)
            t_m = time.time()
            for i in arz_bnb:
                exec(f'{i}  = []')
                exec(f'{i[:-4]}  = None')
                exec(f'{i[:-4]}sellrls  = False')
                exec(f'{i[:-4]}buyrls  = False')
                exec(f'{i[:-4]}sellusdt  = False')
                exec(f'{i[:-4]}buyusdt  = False')

            m_all = nobi.wallet_list()

        t1 = time.time()
        final_ = final()
        # print(time.time() - t1)

        if not final_ or not tread:
            continue

        for i in final_:
            Thread(target=order_final, args=(i,)).start()
    except Exception as r:
        print('error while ', r)
        time.sleep(5)
