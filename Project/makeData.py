import csv
def main():
    counter = 0
    summerYear = [1896, 1900, 1904, 1908, 1912, 1920, 1924, 1928, 1932, 1936, 1948, 1952, 1956, 1960, 1964,
                  1968, 1972, 1976, 1980, 1984, 1988, 1992, 1996, 2000, 2004, 2008, 2012, 2016]
    winterYear = [1924, 1928, 1932, 1936, 1948, 1952, 1956, 1960, 1964, 1968, 1972, 1976, 1980, 1984, 1988,
                  1992, 1994, 1998, 2002, 2006, 2010, 2014, 2018]
    medals = ["Gold", "Silver", "Bronze"]
    NOCs = ["AFG","AGO","ALB","DZA","AND","ANG","ANT","ARG","ARM","ARU","ASA","AUS","AUT","AZE","BHS","BGD","BAR","BDI","BEL","BEN","BER","BTN","BIH","BLZ","BLR","BOL","BWA","BRA","BRN","BRN","BGR","BFA","CAF","KHM","CAN","CAY","COG","TCD","CHL","CHN","CIV","CMR","COD","COK","COL","COM","CPV","CRI","HRV","CUB","CYP","CZE","DNK","DEU","DJI","DMA","DOM","ECU","EGY","ERI","SLV","ESP","EST","ETH","FJI","FIN","FRA","FSM","GAB","GMB","GBR","GNB","GEO","GNQ","DEU","GHA","GRC","GRN","GTM","GIN","GUM","GUY","HTI","HKG","HND","HUN","IDN","IND","TWN","IRN","GRL","IRL","IRQ","ISL","ISR","ISV","ITA","IVB","JAM","JOR","JPN","KAZ","KEN","KGZ","KIR","KOR","KOS","SAU","KWT","LAO","LVA","LBY","LBN","LBR","LCA","LSO","LIE","LTU","LUX","MDG","MAR","MYS","MWI","MDA","MDV","MEX","MNG","MHL","MKD","MLI","MLT","MNE","MON","MOZ","MRI","MRT","MMR","NAM","NIC","NLD","NPL","NGA","NER","NOR","NRU","NZL","OMN","PAK","PAN","PRY","PER","PHL","PLE","PLW","PNG","POL","PRT","PRK","PRI","QAT","ROU","ZAF","RUS","RWA","SAM","SEN","SEY","SGP","SKN","SLE","SVN","SMR","SLB","SOM","SRB","LKA","SSD","STP","SDN","CHE","SUR","SVK","SWE","SWZ","SYR","TZA","TGA","THA","TJK","TKM","TLS","TGO","TPE","TTO","TUN","TUR","TUV","ARE","UGA","UKR","URY","USA","UZB","VUT","VEN","VNM","VIN","YEM","ZMB","ZWE"]


    for NOC in NOCs:


        outputfile = "DataLineGraph/s" + NOC + ".csv"
        output = open(outputfile, 'w')
        writer = csv.writer(output, delimiter=',', quotechar='"', quoting=csv.QUOTE_NONNUMERIC)
        header = ["medal", "year", "amount"]
        writer.writerow(header)
        writer.writerow(["Gold","1896","0"])
        writer.writerow(["Silver","1896","0"])
        writer.writerow(["Bronze","1896","0"])

        for year in summerYear:
            counter = 0
            stri = "Data/s" + str(year) + ".csv"
            # stri = str(year)
            with open(stri, 'rt') as csvfile:
                content = csv.reader(csvfile)
                for row in content:
                    if row[0] == NOC:
                        # print (",".join([row[0], row[1],row[2],row[3],row[4]]))
                        for i in range(len(medals)):
                            # print(",".join([medals[i], str(year), row[1 + i]]))
                            writer.writerow([medals[i], str(year), row[1 + i]])
                        counter = 1
            if counter == 0:
                writer.writerow(["Gold",str(year),"0"])
                writer.writerow(["Silver",str(year),"0"])
                writer.writerow(["Bronze",str(year),"0"])

        output.close()

    for NOC in NOCs:


        outputfile = "DataLineGraph/w" + NOC + ".csv"
        output = open(outputfile, 'w')
        writer = csv.writer(output, delimiter=',', quotechar='"', quoting=csv.QUOTE_NONNUMERIC)
        header = ["medal", "year", "amount"]
        writer.writerow(header)
        writer.writerow(["Gold","1924","0"])
        writer.writerow(["Silver","1924","0"])
        writer.writerow(["Bronze","1924","0"])

        for year in winterYear:
            counter = 0
            stri = "Data/w" + str(year) + ".csv"
            # stri = str(year)
            with open(stri, 'rt') as csvfile:
                content = csv.reader(csvfile)
                for row in content:
                    if row[0] == NOC:
                        # print (",".join([row[0], row[1],row[2],row[3],row[4]]))
                        for i in range(len(medals)):
                            # print(",".join([medals[i], str(year), row[1 + i]]))
                            writer.writerow([medals[i], str(year), row[1 + i]])
                            counter = 1
            if counter == 0:
                writer.writerow(["Gold",str(year),"0"])
                writer.writerow(["Silver",str(year),"0"])
                writer.writerow(["Bronze",str(year),"0"])
        output.close()
        # with open(stri, 'rt') as inf:
        #     data = [(int(row['Total']), row['']) for row in csv.DictReader(inf)]
        #
        # data.sort()
        # print (data[0])


    #
    # with open(stri, 'rb') as csvfile:
    #     spamreader = csv.reader(csvfile, delimiter=' ', quoteTCDr='|')
    #     for row in spamreader:
    #         print (', '.join(row))

if __name__=="__main__":
    main()
