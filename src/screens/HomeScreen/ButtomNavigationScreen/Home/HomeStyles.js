import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },

  loaderOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.3)',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 9999,
  },

  titleBox: {
    backgroundColor: '#e0cd8b',
    paddingVertical: 12,
    paddingHorizontal: 15,
  },

  heading: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#887d66',
  },

  headerRow: {
    flexDirection: 'row',
    paddingVertical: 10,
    paddingHorizontal: 10,
    backgroundColor: '#faf7ef',
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },

  headerText: {
    fontWeight: 'bold',
    fontSize: 13,
    textAlign: 'center',
  },

  card: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    paddingVertical: 10,
    paddingHorizontal: 10,
    borderBottomWidth: 1,
    borderColor: '#eee',
    alignItems: 'center',
  },

  cardContent: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },

  cardText: {
    flex: 1,
    fontSize: 12,
    color: '#333',
    paddingHorizontal: 4,
  },

  icon: {
    width: 18,
    height: 18,
    marginRight: 8,
    resizeMode: 'contain',
  },

  shareIconImage: {
    width: 20,
    height: 20,
    resizeMode: 'contain',
  },

  shareButton: {
    padding: 4,
  },

  emptyState: {
    marginTop: 40,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },

  emptyImage: {
    width: 100,
    height: 100,
    marginBottom: 12,
  },

  emptyTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#444',
    marginBottom: 4,
  },

  emptySubtitle: {
    fontSize: 13,
    color: '#888',
    marginBottom: 16,
    textAlign: 'center',
  },

  uploadButton: {
    backgroundColor: '#e0cd8b',
    paddingVertical: 10,
    paddingHorizontal: 18,
    borderRadius: 6,
  },

  uploadButtonText: {
    color: '#fff',
    fontWeight: '700',
  },

  paginationWrapper: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    paddingHorizontal: 10,
    marginVertical: 12,
    alignItems: 'center',
  },

  pageNumber: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    marginHorizontal: 4,
    borderWidth: 1,
    borderColor: '#c9b04e',
    borderRadius: 8,
    backgroundColor: '#fff',
  },

  activePage: {
    backgroundColor: '#c9b04e',
  },

  pageText: {
    color: '#c9b04e',
    fontSize: 14,
    fontWeight: '600',
  },

  activePageText: {
    color: '#fff',
  },

  dots: {
    marginHorizontal: 6,
    fontSize: 16,
  },
});